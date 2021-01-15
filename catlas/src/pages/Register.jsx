import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Grid, Header, Icon, Segment } from "semantic-ui-react";

function Register() {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);

    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (_, { name, value }) => setData({ ...data, [name]: value });

    const handleSubmit = async () => {

    }

    return (
        <Grid columns={1} textAlign='center'>
            <Grid.Column style={{ maxWidth: 400 }}>
                <Segment padded>
                    <Header as='h2' icon>
                        <Icon name='signup' circular />
                        <Header.Content>회원가입</Header.Content>
                    </Header>
                    <Form onSubmit={handleSubmit} loading={loading}>
                        <Form.Input icon='user' iconPosition='left' onChange={handleChange} placeholder='아이디' name='username'></Form.Input>
                        <Form.Input icon='lock' iconPosition='left' onChange={handleChange} placeholder='비밀번호' name='password' type='password'></Form.Input>
                        <Form.Input icon='mail' iconPosition='left' onChange={handleChange} placeholder='웹메일 아이디' name='username'></Form.Input>
                        <Button fluid type='submit'>회원가입</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default Register;