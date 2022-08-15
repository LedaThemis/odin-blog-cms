import styled from 'styled-components';

import LogoutPrompt from '../components/LogoutPrompt';
import { isLoggedIn } from '@ledathemis/odin-blog-library/Users';

const Logout = () => {
    return (
        <StyledLogout>
            {isLoggedIn() ? <LogoutPrompt /> : <p>You are not logged in.</p>}
        </StyledLogout>
    );
};

const StyledLogout = styled.div`
    display: grid;
    place-items: center;
`;

export default Logout;
