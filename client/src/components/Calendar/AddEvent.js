import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap'

const MyVerticallyCenteredModal = (props) => {
    const [chosenDate, setChosenDate] = useState(new Date(Date.now()))
    const [period, setPerion] = useState('once')
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
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
          <form>
            <div className="form-row align-items-center mb-1">
                <input type="text" class="form-control" placeholder="Заголовок"/>
            </div>
            <div className="form-row align-items-center mb-1">
                <textarea type="text" class="form-control" placeholder="Описание"/>
            </div>
            <div className="form-row align-items-center mb-1">
                <select class="custom-select">
                    <option selected>Периодичность</option>
                    <option value="once">Один раз</option>
                    <option value="everyWeek">Раз в неделю</option>
                    <option value="everyMonth">Раз в месяц</option>
                </select>
            </div>
            <div className="form-row align-items-center mb-1">
                <input className="form-group col-6" type="text" value={chosenDate.toLocaleDateString('ru-RU')} class="form-control"/>
                <input className="form-group col-6" type="text" value={chosenDate.toLocaleTimeString('ru-RU')} class="form-control"/>
            </div>
            <div class="form-row align-items-center mb-1">
                <button type="submit" class="btn btn-primary">Submit</button>
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