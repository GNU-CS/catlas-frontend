import Joi from "joi";
import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Input, Segment } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import { post } from "../../redux/modules/post";

const PLACEHOLDER_MESSAGES = [
    "자유게시판을 이용하실 때의 주의사항!",
    "1. 불특정 다수에게 보여지는 글인만큼 예의를 지켜주세요!",
    "2. 타인에게 불쾌감을 줄 수 있는 사진/영상 등의 업로드를 자제해주세요!",
    "3. 영상의 경우, 에디터 화면에서는 재생이 불가합니다! 에디터 메뉴의 미리보기를 이용해주세요!"
];

const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
});

// TODO
// 서버에 이미지 저장 API 날리기 - 추가 이슈 작성

function NewPost() {
    const buttonList = [
        ['undo', 'redo'],
        ['fontSize', 'formatBlock'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor'],
        ['removeFormat'],
        '/', // Line break
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list'],
        ['table', 'link', 'image', 'video'],
        ['fullScreen', 'showBlocks', 'codeView', 'preview']
    ];

    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submit, setSubmit] = useState(false);

    const loading = useSelector(state => state.post.loading);
    const errorCode = useSelector(state => state.post.errorCode);

    const handleTitleChange = (_, data) => {
        setTitle(data.value);
    }

    // SunEditor is different from Semantic UI React Input
    const handleEditorChange = content => {
        setContent(content);

        if (content === '<p><br></p>') setContent('');
    }

    const handleConfirm = async () => {
        const data = { title: title, content: content };

        const success = await dispatch(post(data));

        console.log(errorCode);

        if (success) history.goBack();
        else {
            switch (errorCode) {
                case 'ECONNABORTED':
                    console.log('서버와 통신할 수 없습니다!');
                    break;
                default:
                    console.log('해당 게시글을 작성할 수 없습니다!');
            }
        }
    }

    useEffect(() => {
        const data = { title: title, content: content };

        const result = schema.validate(data);

        if (!result.error) setSubmit(true);
        else setSubmit(false);
    }, [title, content]);

    return (
        <Container>
            <Segment loading={loading}>
                <Input fluid size='big' placeholder='제목' name='title' onChange={handleTitleChange} />
                <Divider hidden />
                <SunEditor
                    height='40vh'
                    autoFocus={true}
                    name='content'
                    placeholder={PLACEHOLDER_MESSAGES.join('\n')}
                    onChange={handleEditorChange}
                    setOptions={{
                        buttonList: buttonList
                    }}
                />
            </Segment>
            <Button onClick={handleConfirm} disabled={!submit} floated='right' positive content='확인' />
            <Button as={Link} to='/talks' floated='right' content='취소' />
        </Container>
    )
}

export default NewPost;