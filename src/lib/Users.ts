import ms from 'ms';

import { AccessDetails, AccessResponse } from '../typings';

export const login = async ({ username, password }: AccessDetails) => {
    try {
        const res: AccessResponse = await (
            await fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
        ).json();

        if (res.token && res.expiresIn) {
            const expiresAt = Date.now() + ms(res.expiresIn);

            localStorage.setItem('token', 'Bearer ' + res.token);
            localStorage.setItem(
                'expiresAt',
                JSON.stringify(expiresAt.valueOf()),
            );
        }

        return res;
    } catch {
        return {
            errors: [{ msg: 'An error occurred while submitting request.' }],
        };
    }
};

export const isLoggedIn = () => {
    try {
        if (
            !localStorage.getItem('token') ||
            !localStorage.getItem('expiresAt')
        ) {
            return false;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const expiresAt = JSON.parse(localStorage.getItem('expiresAt')!);

        return Date.now() < expiresAt;
    } catch {
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
};
