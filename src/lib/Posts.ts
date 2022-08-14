import {
    CreatePostResponse,
    GetPostResponse,
    PostInput,
    PostType,
    UpdatePostResponse,
} from '../typings';
import { isLoggedIn } from './Users';

export const createPost = async ({
    title,
    content,
}: PostInput): Promise<CreatePostResponse> => {
    if (!isLoggedIn()) {
        return {
            state: 'failed',
            errors: [{ msg: 'You are not logged in.' }],
        };
    }

    try {
        const response: PostType = await (
            await fetch(`${process.env.REACT_APP_BASE_URL}/posts/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    Authorization: localStorage.getItem('token')!,
                },
                body: JSON.stringify({ title, content }),
            })
        ).json();

        return response;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};

export const updatePost = async ({
    title,
    content,
    id,
}: PostInput & { id: string }): Promise<UpdatePostResponse> => {
    if (!isLoggedIn()) {
        return {
            state: 'failed',
            errors: [{ msg: 'You are not logged in.' }],
        };
    }

    try {
        const response: PostType = await (
            await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    Authorization: localStorage.getItem('token')!,
                },
                body: JSON.stringify({ title, content }),
            })
        ).json();

        return response;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};

export const getPost = async ({
    id,
}: {
    id: string;
}): Promise<GetPostResponse> => {
    try {
        const response: GetPostResponse = await (
            await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    Authorization: localStorage.getItem('token')!,
                },
            })
        ).json();

        return response;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};
