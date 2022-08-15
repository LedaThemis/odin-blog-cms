/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { createPost, updatePost } from '@ledathemis/odin-blog-library/Posts';
import { StyledButton } from '../styled/StyledButton';
import { ErrorType } from '@ledathemis/odin-blog-library/typings';
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
    const { postId } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState<ErrorType[]>();
    const [title, setTitle] = useState(initialTitle);

    const editorRef = useRef<Editor | null>(null);

    const save = () => {
        if (editorRef.current) {
            // @ts-ignore
            const content = editorRef.current.getContent();

            // @ts-ignore
            editorRef.current.setDirty(false);

            (async () => {
                if (operation === 'create') {
                    const res = await createPost({ title, content });

                    if (res.state === 'failed') {
                        setErrors(res.errors);
                    }
                } else if (operation === 'update' && postId) {
                    const res = await updatePost({
                        title,
                        content,
                        id: postId,
                    });

                    if (res.state === 'failed') {
                        setErrors(res.errors);
                    }
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
                apiKey="kri72kvfdq03ly2nesal5i9wg3bxusfdu4bascd860lvyasm"
                initialValue={initialContent}
                // @ts-ignore
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                    plugins: 'preview',
                }}
            />
            <StyledButton onClick={save}>{buttonName}</StyledButton>
            {errors && <Errors errors={errors} />}
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
