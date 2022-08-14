import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Errors from '../components/Errors';
import PostEditor from '../components/PostEditor';
import { getPost } from '../lib/Posts';
import { GetPostResponse } from '../typings';

const PostEdit = () => {
    const [response, setResponse] = useState<GetPostResponse>();
    const { postId } = useParams();

    useEffect(() => {
        (async () => {
            if (postId) {
                const res = await getPost({ id: postId });

                setResponse(res);
            }
        })();
    }, []);

    if (response && response.state === 'success') {
        return (
            <StyledContainer>
                <h1>Edit Post: {response.post._id}</h1>
                <PostEditor
                    initialTitle={response.post.title}
                    initialContent={response.post.content}
                    buttonName='Update Post'
                    operation='update'
                />
            </StyledContainer>
        );
    } else if (response && response.state === 'failed') {
        return <Errors errors={response.errors} />;
    } else {
        return <div>Loading</div>;
    }
};

const StyledContainer = styled.div`
    display: grid;
    place-content: center;
`;

export default PostEdit;
