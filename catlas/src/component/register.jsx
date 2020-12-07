import React, { useState } from 'react';
import { Button, Form, Modal } from "semantic-ui-react";

function Register(props) {
    const [values, setValues] = useState({
        id: '',
        mail: '',
        password: ''
    });

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = () => {
        const submitId = values.id;
        const submitMail = values.mail;
        const submitPw = values.password;

        console.log(submitId);
        console.log(submitMail);
        console.log(submitPw);

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