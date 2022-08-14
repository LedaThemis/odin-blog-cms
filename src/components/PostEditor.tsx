/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { createPost, updatePost } from '../lib/Posts';
import { StyledButton } from '../styled/StyledButton';
import { CreatePostResponse, UpdatePostResponse } from '../typings';
import Errors from './Errors';

const PostEditor = ({
    initialTitle,
    initialContent,
    buttonName,
    operation,
}: {
    initialTitle: string;
    initialContent: string;
    buttonName: string;
    operation: 'create' | 'update';
}) => {
    const editorRef = useRef<Editor | null>(null);
    const [response, setResponse] = useState<
        CreatePostResponse | UpdatePostResponse
    >();
    const [title, setTitle] = useState(initialTitle);
    const { postId } = useParams();
    const navigate = useNavigate();

    const save = () => {
        if (editorRef.current) {
            // @ts-ignore
            const content = editorRef.current.getContent();

            // @ts-ignore
            editorRef.current.setDirty(false);

            (async () => {
                if (operation === 'create') {
                    const res = await createPost({ title, content });
                    setResponse(res);
                } else if (operation === 'update' && postId) {
                    const res = await updatePost({
                        title,
                        content,
                        id: postId,
                    });

                    setResponse(res);
                }

                navigate('/');
            })();
        }
    };

    return (
        <StyledContainer>
            <StyledLabel>
                <StyledH3>Title</StyledH3>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
            </StyledLabel>
            <StyledH3>Content</StyledH3>
            <Editor
                initialValue={initialContent}
                // @ts-ignore
                onInit={(evt, editor) => (editorRef.current = editor)}
            />
            <StyledButton onClick={save}>{buttonName}</StyledButton>
            {response && response.state === 'failed' && (
                <Errors errors={response.errors} />
            )}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    padding-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
`;

const StyledH3 = styled.h3`
    margin: 0;
`;

export default PostEditor;
