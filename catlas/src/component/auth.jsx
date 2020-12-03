import React from "react";
import { Button, Form, Modal } from "semantic-ui-react";

function Auth(props) {
    return (
        <Modal size='tiny' open={props.open} onClose={() => props.onClose()}>
            <Modal.Content>
                <Form>
                    <Form.Input icon='user' iconPosition='left' placeholder='아이디' />
                    <Form.Input icon='lock' iconPosition='left' placeholder='비밀번호' />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button type='button' content='회원이 아니신가요?' />
                <Button type='submit' content='로그인' />
            </Modal.Actions>
        </Modal>
    );
}

export default Auth;