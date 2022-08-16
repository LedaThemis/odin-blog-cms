import { isLoggedIn } from '@ledathemis/odin-blog-library/Users';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
    return (
        <StyledNavBar>
            <StyledH1>Blog CMS</StyledH1>
            <StyledLinks>
                <li>
                    <StyledLink to="/">Dashboard</StyledLink>
                </li>
                {!isLoggedIn() ? (
                    <li>
                        <StyledLink to="login">Login</StyledLink>
                    </li>
                ) : (
                    <li>
                        <StyledLink to="logout">Logout</StyledLink>
                    </li>
                )}
            </StyledLinks>
        </StyledNavBar>
    );
};

const StyledNavBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;

    background-color: var(--primary-color);
    color: white;
`;

const StyledH1 = styled.h1`
    margin: 0;
`;

const StyledLinks = styled.ul`
    display: flex;
    list-style-type: none;
    gap: 16px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

export default Navbar;
