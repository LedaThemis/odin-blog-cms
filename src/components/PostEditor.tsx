/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { createPost } from '../lib/Posts';
import { StyledButton } from '../styled/StyledButton';
import { CreatePostResponse } from '../typings';
import Errors from './Errors';

const PostEditor = ({
    initialTitle,
    initialContent,
}: {
    initialTitle: string;
    initialContent: string;
}) => {
    const editorRef = useRef<Editor | null>(null);
    const [response, setResponse] = useState<CreatePostResponse>();
    const [title, setTitle] = useState(initialTitle);
    const [dirty, setDirty] = useState(false);
    useEffect(() => setDirty(false), [initialContent]);
    const save = () => {
        if (editorRef.current) {
            // @ts-ignore
            const content = editorRef.current.getContent();
            setDirty(false);

            // @ts-ignore
            editorRef.current.setDirty(false);

            (async () => {
                const res = await createPost({ title, content });

                // @ts-ignore
                setResponse(res);
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
                onDirty={() => setDirty(true)}
            />
            <StyledButton onClick={save} disabled={!dirty}>
                Create Post
            </StyledButton>
            {response && response.state === 'failed' && <Errors errors={response.errors} />}
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
