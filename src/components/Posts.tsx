import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { deletePost } from '../lib/Posts';
import { getUserPosts } from '../lib/Users';
import { PostsResponse } from '../typings';
import Errors from './Errors';
import PreviewPost from './PreviewPost';

const Posts = () => {
    const [response, setResponse] = useState<PostsResponse>();
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        (async () => {
            const res: PostsResponse = await getUserPosts();
            setResponse(res);
        })();
    }, [refetch]);

    const handlePostDelete = async (id: string) => {
        await deletePost({ id });

        setRefetch(!refetch);
    };

    const getOulet = () => {
        if (response && response.state === 'failed') {
            return (
                <div>
                    <Errors errors={response.errors} />
                </div>
            );
        } else if (response && response.state === 'success') {
            return (
                <StyledPostsContainer>
                    {response.posts.length === 0 ? (
                        <p>You have no posts</p>
                    ) : (
                        response.posts.map((post) => (
                            <PreviewPost
                                key={post._id}
                                post={post}
                                handleDelete={() => handlePostDelete(post._id)}
                            />
                        ))
                    )}
                </StyledPostsContainer>
            );
        } else {
            return <div></div>;
        }
    };

    return (
        <StyledContainer>
            <h2>Posts</h2>
            {getOulet()}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    width: 100%;
`;

const StyledPostsContainer = styled.div`
    display: grid;
    place-content: center;
    grid-template-columns: repeat(auto-fit, 250px);
    gap: 16px;
    width: 100%;
`;

export default Posts;
