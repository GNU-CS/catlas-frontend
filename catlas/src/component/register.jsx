import React, { useState } from 'react';
import { Button, Form, Modal } from "semantic-ui-react";

function Register(props) {
    const [values, setValues] = useState({
        account: '',
        mail: '',
        password: ''
    });

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = () => {
        const submitAccount = values.account;
        const submitMail = values.mail;
        const submitPassword = values.password;

        const data = {
            account: submitAccount,
            mail: submitMail,
            password: submitPassword
        }

        // REST를 이용해 백엔드와 통신

        props.onClose();
    }

    return (
        <Modal as={Form} onSubmit={() => handleSubmit()} size='mini' open={props.open} onClose={() => props.onClose()}>
            <Modal.Content>
                <Form.Input icon='user' iconPosition='left' placeholder='아이디' name='id' onChange={handleChange} />
                <Form.Input icon='mail' iconPosition='left' placeholder='GNU 웹메일 아이디' name='mail' onChange={handleChange} />
                <Form.Input icon='lock' iconPosition='left' placeholder='비밀번호' type='password' name='password' onChange={handleChange} />
            </Modal.Content>
            <Modal.Actions>
                <Button type='submit' content='회원가입' color='green' />
            </Modal.Actions>
        </Modal>
    );
}

export default Register;