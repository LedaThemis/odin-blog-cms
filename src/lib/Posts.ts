import { PostInput, PostType } from '../typings';
import { isLoggedIn } from './Users';

export const createPost = async ({ title, content }: PostInput) => {
    if (!isLoggedIn()) {
        return {
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
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};
