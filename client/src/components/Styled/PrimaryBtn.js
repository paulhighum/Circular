import styled from 'styled-components';
import colors from './colors';

export default styled.button`
  background-color: ${colors.mainGreen};
  color: ${colors.mainWhite};
  border-radius: 0;
  border: none;
  font-size: 1em;
  text-transform: uppercase;
  border-radius: 2px;
  &:hover{
    cursor: pointer;
    background-color: ${colors.hoverGreen};
  }
`;
