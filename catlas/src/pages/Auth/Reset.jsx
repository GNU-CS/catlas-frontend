// external package
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Icon, Segment } from "semantic-ui-react";

import { createInstance } from "../../component/request";

const schema = Joi.string().alphanum().required();

function Reset() {
    const history = useHistory();

    const [submit, setSubmit] = useState(false);

    const [email, setEmail] = useState('');

    const handleChange = e => setEmail(e.target.value);
    
    const handleSubmit = async () => {
        const instance = createInstance();

        const data = { email: email };

        await instance.post('auth/reset/', data);

        history.replace("/");
    }

    useEffect(() => {
        const result = schema.validate(email);

        if (!result.error) setSubmit(true);
        else setSubmit(false);
    }, [email]);

    return (
        <Grid columns={1} centered>
            <Grid.Column style={{ maxWidth: 400 }}>
                <Segment padded>
                    <Header textAlign='center' as='h2' icon>
                        <Icon name='lock' circular />
                        <Header.Content>비밀번호 재설정</Header.Content>
                    </Header>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input icon='mail' iconPosition='left' onChange={handleChange} label='경상대 웹메일 아이디(@gnu.ac.kr 제외)' name='email'></Form.Input>
                        <Button positive fluid type='submit' disabled={!submit}>회원가입</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default Reset;