import { useNavigate } from 'react-router-dom';

import { StyledButton } from '../styled/StyledButton';

const ActionButtons = () => {
    const navigate = useNavigate();
    return (
        <div>
            <StyledButton onClick={() => navigate('/posts/create')}>
                Create Post
            </StyledButton>
        </div>
    );
};


export default ActionButtons;
