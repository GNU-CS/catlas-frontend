import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

function Recovery(props) {
    const [mail, setMail] = useState('');

    const handleChange = e => {
        setMail(e.target.value);
    }

    const handleSubmit = () => {
        const submitMail = mail;

        console.log(submitMail);

        props.onClose();
    }

    return (
        <Modal as={Form} onSubmit={() => handleSubmit()} size='mini' open={props.open} onClose={() => props.onClose()}>
            <Modal.Content>
                <Form.Input icon='mail' iconPosition='left' placeholder='GNU 웹메일 아이디' name='mail' onChange={handleChange} />
            </Modal.Content>
            <Modal.Actions>
                <Button type='submit' content='이메일 인증' color='green' />
            </Modal.Actions>
        </Modal>
    );
}

export default Recovery;