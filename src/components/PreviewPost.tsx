import { BsPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PostType } from '../typings';

const PreviewPost = ({ post }: { post: PostType }) => {
    const navigate = useNavigate();

    return (
        <StyledPost>
            <StyledPostEditButton
                onClick={() => navigate(`/posts/${post._id}/edit`)}
            />
            <StyledH3>{post.title}</StyledH3>
            <StyledP>Author: {post.author.username}</StyledP>
            <StyledP>
                Created: {new Date(post.createdAt).toLocaleDateString()}
            </StyledP>
            <StyledP>
                Updated: {new Date(post.updatedAt).toLocaleDateString()}
            </StyledP>
        </StyledPost>
    );
};

const StyledPostEditButton = styled(BsPencilFill)`
    cursor: pointer;
    align-self: flex-end;
    position: absolute;
`;

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
