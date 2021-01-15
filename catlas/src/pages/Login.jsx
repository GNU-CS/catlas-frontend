import React, { useState } from "react";
import { Button, Divider, Form, Grid, Header, Icon, Message, Segment } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../redux/modules/auth";

// How to show register/reset
function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const loading = useSelector(state => state.auth.loading);

    const [error, setError] = useState(false);

    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (_, { name, value }) => setData({ ...data, [name]: value });

    const handleSubmit = async () => {
        setError(false);

        const success = await dispatch(login(data));

        if (success) history.replace("/");
        else setError(true);
    }

    return (
        <Grid columns={1} centered>
            <Grid.Column style={{ maxWidth: 400 }}>
                <Segment padded>
                    <Header textAlign='center' as='h2' icon>
                        <Icon name='sign-in' circular />
                        <Header.Content>환영합니다!</Header.Content>
                    </Header>
                    <Form onSubmit={handleSubmit} loading={loading}>
                        <Form.Input icon='user' iconPosition='left' onChange={handleChange} placeholder='아이디' name='username'></Form.Input>
                        <Form.Input icon='lock' iconPosition='left' onChange={handleChange} placeholder='비밀번호' name='password' type='password'></Form.Input>
                        <Button fluid type='submit'>로그인</Button>
                    </Form>
                    <Divider />
                    <Button.Group fluid>
                        <Button as={Link} to='register' name='register'>
                            회원가입
                        </Button>
                        <Button.Or />
                        <Button as={Link}>
                            비밀번호 재설정
                        </Button>
                    </Button.Group>
                </Segment>
                <Message negative hidden={!error}>
                    <Icon name='exclamation triangle' />
                    입력하신 정보로 로그인하지 못했습니다!
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Login;