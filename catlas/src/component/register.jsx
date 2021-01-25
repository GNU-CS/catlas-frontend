import React, { useState } from 'react';
import { Button, Form, Modal } from "semantic-ui-react";

import { send } from './request';

function Register(props) {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = () => {
        const submitUsername = values.username;
        const submitMail = values.email;
        const submitPassword = values.password;

        const data = {
            username: submitUsername,
            email: submitMail,
            password: submitPassword
        }

        send(data, '/auth/register/', 'post');

        props.onClose();
    }

    return (
        <Modal as={Form} onSubmit={() => handleSubmit()} size='mini' open={props.open} onClose={() => props.onClose()}>
            <Modal.Content>
                <Form.Input icon='user' iconPosition='left' placeholder='아이디' name='username' onChange={handleChange} />
                <Form.Input icon='mail' iconPosition='left' placeholder='GNU 웹메일 아이디' name='email' onChange={handleChange} />
                <Form.Input icon='lock' iconPosition='left' placeholder='비밀번호' type='password' name='password' onChange={handleChange} />
            </Modal.Content>
            <Modal.Actions>
                <Button type='submit' content='회원가입' color='green' />
            </Modal.Actions>
        </Modal>
    );
}

export default Register;