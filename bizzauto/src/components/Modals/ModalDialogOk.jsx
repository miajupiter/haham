import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'

export const ModalDialogOk = (header, body) => {
  const [openModal, setOpenModal] = useState('dismissible')
  const props = { openModal, setOpenModal }

  return (
    <>
      <Modal
        dismissible
        show={props.openModal === 'dismissible'}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDialogOk
