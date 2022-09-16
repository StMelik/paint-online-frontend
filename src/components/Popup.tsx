import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../styles/popup.scss'
import { validation } from '../utils/validation';

interface PopupProps {
    connectHandler: (username: string) => void
}

const Popup: React.FC<PopupProps> = ({ connectHandler }) => {
    const [show, setShow] = useState(true);
    const [message, setMessage] = useState('');
    const usernameRef = useRef<HTMLInputElement>(null)

useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    usernameRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
}, [])

    const handleClose = () => setShow(false);

    function onConnect() {
        const input = usernameRef.current!
        if (!validation(input, setMessage)) return
        connectHandler(input.value)
        handleClose()
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            onConnect()
        }
    }

    return (
        <Modal show={show} onHide={onConnect}>
            <Modal.Header closeButton>
                <Modal.Title>Введите ваше имя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                className='popup__input'
                    type="text"
                    placeholder='Ваше имя'
                    ref={usernameRef}
                    required
                />
                <p className='popup__error'>{message}</p>
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
