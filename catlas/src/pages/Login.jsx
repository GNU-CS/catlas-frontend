// external package
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// internal component
import { login } from "../redux/modules/auth";

const schema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required()
});

// How to show register/reset
function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const loading = useSelector(state => state.auth.loading);
    const errorCode = useSelector(state => state.auth.errorCode);

    const [error, setError] = useState(false);
    const [submit, setSubmit] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (_, { name, value }) => setData({ ...data, [name]: value });

    // Apply schema description library
    const handleSubmit = async () => {
        setError(false);

        const success = await dispatch(login(data));

        if (success) history.replace("/");
        else {
            setError(true);
            
            switch (errorCode) {
                case 'ECONNABORTED':
                    setErrMsg('서버와 통신할 수 없습니다!');
                    break;
                default:
                    setErrMsg('입력한 정보로 로그인할 수 없습니다!');
            }
        }
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
                        <Icon name='sign-in' circular />
                        <Header.Content>환영합니다!</Header.Content>
                    </Header>
                    <Form onSubmit={handleSubmit} loading={loading}>
                        <Form.Input icon='user' iconPosition='left' onChange={handleChange} label='아이디(영숫자)' name='username'></Form.Input>
                        <Form.Input icon='lock' iconPosition='left' onChange={handleChange} label='비밀번호' name='password' type='password'></Form.Input>
                        <Button positive fluid type='submit' disabled={!submit}>로그인</Button>
                    </Form>
                    <Divider />
                    <Button.Group fluid>
                        <Button as={Link} to='register' name='register'>
                            회원가입
                        </Button>
                        <Button.Or />
                        <Button as={Link} to='reset' name='reset'>
                            비밀번호 재설정
                        </Button>
                    </Button.Group>
                </Segment>
                <Message negative hidden={!error}>
                    <Icon name='exclamation triangle' />
                    {errMsg}
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Login;