import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { login } from '../lib/Users';
import { StyledSubmitButton } from '../styled/StyledSubmitButton';
import { AccessResponse } from '../typings';
import Errors from './Errors';

const LoginForm = () => {
    const initialFormData = {
        username: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [response, setResponse] = useState<AccessResponse>({});

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,

            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await login({
            username: formData.username,
            password: formData.password,
        });

        setResponse(res);

        if (res.token) {
            navigate('/');
        }
    };

    return (
        <div>
            <StyledLoginForm onSubmit={handleSubmit} method="POST">
                <StyledLabel>
                    Username:
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                    ></input>
                </StyledLabel>
                <StyledLabel>
                    Password:
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                    ></input>
                </StyledLabel>
                <StyledSubmitButton type="submit">Login</StyledSubmitButton>
            </StyledLoginForm>
            {response && response.errors && (
                <Errors errors={response.errors}></Errors>
            )}
        </div>
    );
};

const StyledLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
`;

export default LoginForm;
