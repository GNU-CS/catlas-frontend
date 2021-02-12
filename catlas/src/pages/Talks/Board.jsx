import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button, Container, Dropdown, Grid, Input, Item, Pagination, Segment } from "semantic-ui-react";

function Board() {
    const { url } = useRouteMatch();

    const searchOptions = [
        { key: 'title', text: '제목', value: 'title' },
        { key: 'author', text: '글쓴이', value: 'author' }
    ]

    return (
        <Container>
            <Segment padded>
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
                        <Button positive as={Link} to={`${url}/new`} icon='write' content='글쓰기' />
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    );
}

function PostList() {
    const elements = [
        { id: 1, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id rhoncus magna, at lobortis leo. Curabitur finibus sit amet mi a venenatis. Maecenas ac ipsum eu arcu vulputate posuere. Nunc ut cursus velit. Suspendisse a ornare massa. Aliquam nibh metus, efficitur et dapibus a, hendrerit ac enim.', date: '2021-01-27' },
        { id: 2, title: 'Donec sit amet ipsum vitae lectus finibus sollicitudin eget eget sapien.', date: '2021-01-27' },
        { id: 3, title: 'Nunc rutrum mollis libero, et iaculis velit molestie nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam dignissim elit vel erat scelerisque, sed aliquet risus iaculis. Praesent odio enim, convallis eget dui id, auctor sodales lectus. Vestibulum non nunc ut augue iaculis molestie.', date: '2021-01-27' },
        { id: 4, title: 'Suspendisse tempus nunc varius magna imperdiet, quis commodo mauris lacinia.', date: '2021-01-27' },
        { id: 5, title: 'Cras tincidunt odio sit amet tellus tempor, nec fringilla dolor dignissim.', date: '2021-01-27' }
    ];

    return (
        <Item.Group divided>
            {
                elements.map((value, _) => {
                    return <Post key={value.id} title={value.title} date={value.date} />
                })
            }
        </Item.Group>
    )
}

function Post(props) {
    return (
        <Item>
            <Item.Content>
                <Item.Header as={Link} to='#'>{props.title}</Item.Header>
                <Item.Description>글쓴이</Item.Description>
                <Item.Extra>{props.date}</Item.Extra>
            </Item.Content>
        </Item>
    );
}

export default Board;