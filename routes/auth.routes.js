const {Router} = require('express')
const ActiveDirectory = require('activedirectory')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

const router = Router()

const getNewUser = async (ad, sAMAccountName) => {
    ad.findUser(sAMAccountName, async function(err, user) {
        if (err) {
          console.log('ERROR: ' +JSON.stringify(err));
          return;
        }
       
        if (! user) console.log('User: ' + sAMAccountName + ' not found.');
        else {
            const newUser = new User({
               ldap: sAMAccountName,
               displayName: user.displayName
            })
            await newUser.save()
            return newUser
        }
      });
}

// body: {
// 	"ldap": "600XXXXX",
// 	"password": "XXXXXXXX"
// }

router.post('/', async (req, res) => {
    try {
        const {ldap, password} = req.body
        const username = ldap + '@leroymerlin.ru'
        const configAD = {
        url: config.get('ADurl'),
        baseDN: config.get('baseDN'),
        username,
        password
        }

        const ad =  new ActiveDirectory(configAD)

        let haveAccess = false
    
        ad.authenticate(username, password, async (err, auth) => {
            if (err) {
                haveAccess = auth
                return res.status(400).json({message: 'Неверные имя пользователя и/или пароль.'})
            } else if (auth) {
                haveAccess = auth
                const token = jwt.sign(
                    {ldap},
                    config.get('jwtSecret'),
                    {expiresIn: '1h'}
                )
                const user = await User.findOne({ldap}) || await getNewUser(ad, ldap)

                // if (!user) {
                //     user = getNewUser(ad, ldap)
                // }
                return res.json({token, userId: user.id, displayName: user.displayName})
            }
        })

        

    } catch (e) {
        res.status(500).json({message: `Что-то пошло не так: ${e.message}`})
    }

    

})

module.exports = router