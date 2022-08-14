import styled from 'styled-components';

import ActionButtons from '../components/ActionButtons';
import Posts from '../components/Posts';
import { isLoggedIn } from '../lib/Users';

const Home = () => {
    return (
        <StyledHome>
            <h1>Dashboard</h1>
            {isLoggedIn() && <ActionButtons />}
            <Posts />
        </StyledHome>
    );
};

const StyledHome = styled.div`
    display: grid;
    text-align: center;
`;

export default Home;
