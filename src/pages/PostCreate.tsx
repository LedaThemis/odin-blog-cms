import styled from 'styled-components';

import PostEditor from '../components/PostEditor';

const PostCreate = () => {
    return (
        <StyledContainer>
            <h1>Create Post</h1>
            <PostEditor initialTitle="" initialContent="" />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: grid;
    place-content: center;
`;

export default PostCreate;
