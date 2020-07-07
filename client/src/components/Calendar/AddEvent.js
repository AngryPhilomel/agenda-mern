import React, {useState, useContext} from 'react'
import {Modal, Button} from 'react-bootstrap'
// import { useParams } from 'react-router-dom'
import { CurrentContext } from '../../context/currentCalendar/currentContext'
import { AuthContext } from '../../context/auth.context'

const MyVerticallyCenteredModal = (props) => {
    const [chosenDate, setChosenDate] = useState(new Date(Date.now()))
    const [period, setPeriod] = useState('once')
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    const {newEvent} = useContext(CurrentContext)
    const {userId} = useContext(AuthContext)
    // const linkId = useParams().id

    const selectDate = event => {
      setChosenDate(new Date(event.target.value))
    }

    const selectTitle = event => {
      setTitle(event.target.value)
    }

    const selectDescription = event => {
      setDescription(event.target.value)
    }

    const selectPeriod = event => {
      setPeriod(event.target.value)
    }

    const createEvent = event => {
      event.preventDefault()
      newEvent({
        title,
        description,
        owner: userId,
        period,
        date: chosenDate
      })
      // console.log(`${title}-${description}-${chosenDate}-${period}`)
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Новое событие
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={createEvent}>
            <div className="form-row align-items-center mb-1">
                <input type="text" class="form-control" placeholder="Заголовок" onChange={selectTitle}/>
            </div>
            <div className="form-row align-items-center mb-1">
                <textarea type="text" class="form-control" placeholder="Описание" onChange={selectDescription}/>
            </div>
            <div className="form-row align-items-center mb-1">
                <select value={period} class="custom-select" onChange={selectPeriod}>
                    <option disabled selected>Периодичность</option>
                    <option value="once">Один раз</option>
                    <option value="everyWeek">Раз в неделю</option>
                    <option value="everyMonth">Раз в месяц</option>
                </select>
            </div>
            <div className="form-row align-items-center mb-1">
                <input className="form-control" type="datetime-local" onChange={selectDate}/>
            </div>
            <div class="form-row align-items-center mb-1">
                <button type="submit" class="btn btn-primary" onClick={props.onHide}>Submit</button>
            </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export const AddEvent = () => {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
            Создать
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }