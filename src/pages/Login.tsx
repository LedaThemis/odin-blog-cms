import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from '../components/LoginForm';
import { isLoggedIn } from '@ledathemis/odin-blog-library/Users';

const Login = () => {
    return (
        <StyledLogin>
            {isLoggedIn() && <Navigate to="/" />}
            <h1>Login Page</h1>
            <LoginForm></LoginForm>
        </StyledLogin>
    );
};

const StyledLogin = styled.div`
    display: grid;
    place-items: center;
`;

export default Login;
