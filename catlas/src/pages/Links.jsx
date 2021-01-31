import React from "react";
import { Container, Item, Segment } from "semantic-ui-react";

import gnu from "../assets/img/gnu.png";
import kakaotalk from "../assets/img/kakaotalk.png";
import facebook from "../assets/img/facebook.png";
import github from "../assets/img/github.png";

function Links() {
    return (
        <Container>
            <Segment padded='very'>
                <LinkItems />
            </Segment>
        </Container>
    );
}

function LinkItems() {
    return (
        <Item.Group divided relaxed>
            <Item as='a' href="http://cs.gnu.ac.kr">
                <Item.Image size='tiny' src={gnu} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header>학과 웹사이트</Item.Header>
                    <Item.Description>
                        경상대학교 컴퓨터과학과 공식 웹사이트입니다.
                    </Item.Description>
                </Item.Content>
            </Item>
            <Item as='a' href="https://pf.kakao.com/_eKDZxb/47223362">
                <Item.Image size='tiny' src={kakaotalk} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header>카카오톡 채널</Item.Header>
                    <Item.Description>
                        공지 및 소식을 쉽게 받아볼 수 있는 카카오톡 채널입니다.
                </Item.Description>
                </Item.Content>
            </Item>
            <Item as='a' href='https://www.facebook.com/DYNAMICCS2020/'>
                <Item.Image size='tiny' src={facebook} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header>학과 페이스북</Item.Header>
                    <Item.Description>
                        경상대학교 컴퓨터과학과 페이스북 페이지입니다.
                    </Item.Description>
                </Item.Content>
            </Item>
            <Item as='a' href='https://github.com/GNU-CS'>
                <Item.Image size='tiny' src={github} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header>비공식 깃허브 그룹</Item.Header>
                    <Item.Description>
                        경상대학교 컴퓨터과학과 비공식 깃허브 그룹입니다.
                    </Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    );
}

export default Links;