import styled from 'styled-components';

import { PostType } from '../typings';

const PreviewPost = ({ post }: { post: PostType }) => {
    return (
        <StyledPost>
            <StyledH3>{post.title}</StyledH3>
            <StyledP>{new Date(post.createdAt).toLocaleDateString()}</StyledP>
            <StyledP>{post.author.username}</StyledP>
        </StyledPost>
    );
};

const StyledPost = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid black;
`;

const StyledH3 = styled.h3`
    margin: 0;
`;

const StyledP = styled.p`
    margin: 0;
`;

export default PreviewPost;
