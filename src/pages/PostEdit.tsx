import { getPost } from '@ledathemis/odin-blog-library/Posts';
import { ErrorType, PostType } from '@ledathemis/odin-blog-library/typings';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Errors from '../components/Errors';
import PostEditor from '../components/PostEditor';

const PostEdit = () => {
    const [post, setPost] = useState<PostType>();
    const [errors, setErrors] = useState<ErrorType[]>();
    const { postId } = useParams();

    useEffect(() => {
        (async () => {
            if (postId) {
                const res = await getPost({ id: postId });

                switch (res.state) {
                    case 'success':
                        setPost(res.post);
                        break;
                    case 'failed':
                        setErrors(res.errors);
                        break;
                }
            }
        })();
    }, []);

    if (post) {
        return (
            <StyledContainer>
                <h1>Edit Post: {post._id}</h1>
                <PostEditor
                    initialTitle={post.title}
                    initialContent={post.content}
                    buttonName="Update Post"
                    operation="update"
                />
            </StyledContainer>
        );
    } else if (errors) {
        return <Errors errors={errors} />;
    } else {
        return <div>Loading</div>;
    }
};

const StyledContainer = styled.div`
    display: grid;
    place-content: center;
`;

export default PostEdit;
