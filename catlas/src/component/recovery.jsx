import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

function Recovery(props) {
    const [email, setMail] = useState('');

    const handleChange = e => {
        setMail(e.target.value);
    }

    const handleSubmit = () => {
        const submitMail = email;

        const data = {
            email: submitMail
        }

        // REST를 이용해 백엔드와 통신

        props.onClose();
    }

    return (
        <Modal as={Form} onSubmit={() => handleSubmit()} size='mini' open={props.open} onClose={() => props.onClose()}>
            <Modal.Content>
                <Form.Input icon='mail' iconPosition='left' placeholder='GNU 웹메일 아이디' name='email' onChange={handleChange} />
            </Modal.Content>
            <Modal.Actions>
                <Button type='submit' content='이메일 인증' color='green' />
            </Modal.Actions>
        </Modal>
    );
}

export default Recovery;