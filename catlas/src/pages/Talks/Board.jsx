import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { Button, Container, Dropdown, Grid, Input, Item, Message, Pagination, Popup, Segment } from "semantic-ui-react";

import { list } from "../../redux/modules/post";

function Board() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.post.loading);

    useEffect(() => {
        dispatch(list());
    }, [dispatch]);
    
    const searchOptions = [
        { key: 'title', text: '제목', value: 'title' },
        { key: 'author', text: '글쓴이', value: 'author' }
    ]

    return (
        <Container>
            <Segment padded loading={loading}>
                <Grid>
                    <Grid.Column width={16}>
                        <PostList />
                    </Grid.Column>
                    <Grid.Row centered>
                        <Pagination totalPages={5} />
                    </Grid.Row>
                    <Grid.Row centered>
                        <Input
                            label={<Dropdown defaultValue='title' options={searchOptions} />}
                            labelPosition='left'
                            action={<Button primary>검색</Button>}
                        />
                    </Grid.Row>
                    <Grid.Row centered>
                        <LoginButton />
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    );
}

function PostList() {
    const errorCode = useSelector(state => state.post.errorCode);
    const posts = useSelector(state => state.post.list);

    if (errorCode === '') {
        return (
            <Item.Group divided>
                {
                    posts.map((value, _) => {
                        return <Post key={value.id} title={value.title} date={value.date_created} username={value.username} />
                    })
                }
            </Item.Group>
        )
    }

    else return (
        <Message negative content={'게시글을 불러올 수 없습니다!'} />
    )
}

function Post(props) {
    const formatDate = date => {
        const date_created = new Date(date);
        const today = new Date();

        if (today.toDateString() === date_created.toDateString()) return date_created.toLocaleTimeString();
        else return date_created.toLocaleDateString();
    }

    return (
        <Item>
            <Item.Content>
                <Item.Header as={Link} to='#'>{props.title}</Item.Header>
                <Item.Description>{props.username}</Item.Description>
                <Item.Extra>{formatDate(props.date)}</Item.Extra>
            </Item.Content>
        </Item>
    );
}

function LoginButton() {
    const { url } = useRouteMatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    if (isLoggedIn) return <Button positive as={Link} to={`${url}/new`} icon='write' content='글쓰기' />;
    else return <Popup content='로그인 후에 가능합니다!' position='top center' trigger={<Button negative icon='write' content='글쓰기' />} />;
}

export default Board;