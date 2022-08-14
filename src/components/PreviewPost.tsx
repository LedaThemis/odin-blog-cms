import { useState } from 'react';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { togglePostPublished } from '../lib/Posts';
import { StyledButton } from '../styled/StyledButton';
import { PostType } from '../typings';

interface IPreviewPost {
    post: PostType;
    handleDelete: () => void;
}

const PreviewPost = ({ post, handleDelete }: IPreviewPost) => {
    const [currentPost, setCurrentPost] = useState<PostType>(post);
    const navigate = useNavigate();

    const handlePublishClick = async () => {
        const updatedPost = await togglePostPublished({ post: currentPost });

        if (updatedPost.state === 'success') {
            setCurrentPost(updatedPost.post);
        }
    };

    return (
        <StyledPost>
            <StyledPostDeleteButton onClick={handleDelete} />
            <StyledPostEditButton
                onClick={() => navigate(`/posts/${currentPost._id}/edit`)}
            />
            <StyledH3>{currentPost.title}</StyledH3>
            <StyledP>Author: {currentPost.author.username}</StyledP>
            <StyledP>
                Created: {new Date(currentPost.createdAt).toLocaleDateString()}
            </StyledP>
            <StyledP>
                Updated: {new Date(currentPost.updatedAt).toLocaleDateString()}
            </StyledP>
            <StyledPublishButton onClick={handlePublishClick}>
                {currentPost.isPublished ? 'Unpublish' : 'Publish'}
            </StyledPublishButton>
        </StyledPost>
    );
};

const StyledPublishButton = styled(StyledButton)``;

const StyledPostDeleteButton = styled(BsFillTrashFill)`
    cursor: pointer;
    position: absolute;
`;

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
    gap: 6px;
`;

const StyledH3 = styled.h3`
    margin: 0;
`;

const StyledP = styled.p`
    margin: 0;
`;

export default PreviewPost;
