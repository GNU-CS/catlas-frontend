import React from "react";
import { Container, Grid, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import bgimg from "../assets/img/catlas-logo.png";

function Theme() {
    const authMenu = (isLoggedIn) => {
        if (isLoggedIn) return '로그아웃'
        else return '로그인'
    }

    return (
        <Grid container columns={1} verticalAlign='middle' padded='vertically'>
            <Grid.Column>
                <Container as={Link} to=''>
                    <Image src={bgimg} centered size='huge'></Image>
                </Container>
            </Grid.Column>
            <Grid.Column>
                <Menu pointing widths={7} stackable>
                    <Menu.Item as={Link} to='clubs' name='clubs'>동아리</Menu.Item>
                    <Menu.Item as={Link} to='about' name='about'>집부</Menu.Item>
                    <Menu.Item as={Link} to='talks' name='talks'>자유게시판</Menu.Item>
                    <Menu.Item as={Link} to='links' name='links'>바로가기</Menu.Item>
                    <Menu.Item href='https://github.com/GNU-CS/catlas-frontend/issues' name='admin'>관리자에게</Menu.Item>
                    <Menu.Item as={Link} to='scenes' name='scenes'>사진첩</Menu.Item>
                    <Menu.Item name='account'>{authMenu(false)}</Menu.Item>
                </Menu>
            </Grid.Column>
        </Grid>
    );
}
export default Theme;