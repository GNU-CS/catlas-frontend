import React, { useState } from "react";
import { Button, Form, Header, Message, Modal } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import { loginAction } from "../redux/modules/auth";

import Register from './register';
import Recovery from './recovery';

// Needs to be refactored

function Auth(props) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const [showRegister, setShowRegister] = useState(false);
    const [showRecovery, setShowRecovery] = useState(false);
    const [showError, setShowError] = useState(false);
    
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const openModal = e => {
        if (e.target.name === 'register') setShowRegister(true);
        else if (e.target.name === 'recovery') setShowRecovery(true);
        else {}
    }

    const closeRegister = () => {
        setShowRegister(false);
    }

    const closeRecovery = () => {
        setShowRecovery(false);
    }

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = () => {
        setShowError(false);

        const submitUsername = values.username;
        const submitPassword = values.password;

        const data = {
            username: submitUsername,
            password: submitPassword
        }

        // REST를 이용해 백엔드와 통신

        dispatch(loginAction(data))
        .then(() => {
            if (!isLoggedIn) setShowError(true);
            else props.onClose();
        });
    }

    return (
        <>
            <Modal as={Form} onSubmit={() => handleSubmit()} size='tiny' open={props.open} onClose={() => props.onClose()}>
                <Modal.Content>
                    <Form.Input icon='user' iconPosition='left' placeholder='아이디' name='username' onChange={handleChange} />
                    <Form.Input icon='lock' iconPosition='left' placeholder='비밀번호' type='password' name='password' onChange={handleChange} />
                    <Message negative hidden={!showError}>
                        <Message.Header as={Header} textAlign='center'>입력하신 정보가 올바르지 않습니다!</Message.Header>
                    </Message>
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group floated='left'>
                        <Button type='button' content='계정 만들기' name='register' onClick={e => openModal(e)} />
                        <Button.Or />
                        <Button type='button' content='계정 정보 찾기' name='recovery' onClick={e => openModal(e)} />
                    </Button.Group>
                    <Button type='submit' content='로그인' color='green' />
                </Modal.Actions>
            </Modal>
            <Register open={showRegister} onClose={closeRegister} />
            <Recovery open={showRecovery} onClose={closeRecovery} />
        </>
    );
}

export default Auth;