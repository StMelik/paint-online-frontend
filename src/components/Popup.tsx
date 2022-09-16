import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/popup.scss'
import { validation } from '../utils/validation';

interface PopupProps {
    connectHandler: (username: string) => void;
    show: boolean;
    onClose: Function
}

const Popup: React.FC<PopupProps> = ({ connectHandler, show, onClose }) => {
    const [message, setMessage] = useState('');
    const usernameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        usernameRef.current?.focus()
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    function onConnect() {
        const input = usernameRef.current!
        if (!validation(input, setMessage)) return
        connectHandler(input.value)
        onClose()
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') onConnect()
    }

    return (
        <div
            className="popup"
            onClick={onConnect}
        >
            <CSSTransition
                in={show}
                timeout={500}
                classNames={{
                    appearActive: "popup__content-show",
                    exitActive: "popup__content-hide",
                }}
                enter={false}
                appear
                unmountOnExit
                mountOnEnter
            >
                <div
                    className="popup__content"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="popup__header">
                        <h2 className="popup__header-title">Введите ваше имя</h2>
                        <button
                            className="popup__header-close"
                            onClick={onConnect}
                        />
                    </div>
                    <div className="popup__body">
                        <input
                            className='popup__body-input'
                            type="text"
                            placeholder='Ваше имя'
                            ref={usernameRef}
                            required
                        />
                        <CSSTransition
                            in={!!message}
                            timeout={300}
                            classNames={{
                                enterActive: "popup__body-error-show"
                            }}
                            exit={false}
                        >
                            <p className='popup__body-error'>{message}</p>
                        </CSSTransition>
                    </div>
                    <div className="popup__footer">
                        <button
                            className="popup__footer-button"
                            onClick={onConnect}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default Popup;
