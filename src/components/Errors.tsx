import styled from 'styled-components';

import { ErrorType } from '@ledathemis/odin-blog-library/typings';

const Errors = ({ errors }: { errors: ErrorType[] }) => {
    return (
        <div>
            {errors.map((error) => (
                <StyledErrorParagraph key={error.msg}>
                    * {error.msg}
                </StyledErrorParagraph>
            ))}
        </div>
    );
};

const StyledErrorParagraph = styled.p`
    color: red;
`;

export default Errors;
