import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../styles/canvas.scss'

interface PopupProps {
    connectHandler: (username: string) => void
}

const Popup: React.FC<PopupProps> = ({ connectHandler }) => {
    const [show, setShow] = useState(true);
    const usernameRef = useRef<HTMLInputElement>(null)

    const handleClose = () => setShow(false);

    function onConnect() {
        connectHandler(usernameRef.current!.value)
        handleClose()
    }

    const stylesInput: React.CSSProperties = {
        padding: '5px 10px',
        width: '100%',
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Введите ваше имя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    placeholder='Ваше имя'
                    style={stylesInput}
                    ref={usernameRef}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onConnect}>
                    Войти
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Popup;
