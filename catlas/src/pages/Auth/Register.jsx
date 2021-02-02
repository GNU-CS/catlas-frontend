// external package
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react";

// internal component
import { register } from "../../redux/modules/register";

const schema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().required(),
    email: Joi.string().alphanum().required()
});

function Register() {
    const dispatch = useDispatch();
    const history = useHistory();

    const loading = useSelector(state => state.auth.loading);

    const [error, setError] = useState(false);
    const [submit, setSubmit] = useState(false);

    const [data, setData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const handleChange = (_, { name, value }) => setData({ ...data, [name]: value });
    
    const handleSubmit = async () => {
        setError(false);

        const success = await dispatch(register(data));

        if (success) history.replace("/login");
        else setError(true);
    }

    useEffect(() => {
        const result = schema.validate(data);

        if (!result.error) setSubmit(true);
        else setSubmit(false);
    }, [data]);

    return (
        <Grid columns={1} centered>
            <Grid.Column style={{ maxWidth: 400 }}>
                <Segment padded>
                    <Header textAlign='center' as='h2' icon>
                        <Icon name='signup' circular />
                        <Header.Content>회원가입</Header.Content>
                    </Header>
                    <Form onSubmit={handleSubmit} loading={loading}>
                        <Form.Input icon='user' iconPosition='left' onChange={handleChange} label='아이디(영숫자)' name='username'></Form.Input>
                        <Form.Input icon='lock' iconPosition='left' onChange={handleChange} label='비밀번호' name='password' type='password'></Form.Input>
                        <Form.Input icon='mail' iconPosition='left' onChange={handleChange} label='경상대 웹메일 아이디(@gnu.ac.kr 제외)' name='email'></Form.Input>
                        <Button positive fluid type='submit' disabled={!submit}>회원가입</Button>
                    </Form>
                </Segment>
                <Message negative hidden={!error}>
                    <Icon name='exclamation triangle' />
                    입력하신 정보로 가입하지 못했습니다!
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Register;