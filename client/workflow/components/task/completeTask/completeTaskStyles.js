import styled from 'styled-components';
import { ButtonBase } from 'components/helpers/button';
import colors from 'css/colors';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Label = styled.label`
  align-items: center;
  display: flex;
`;

export const Submit = styled(ButtonBase)`
  background-color: ${colors.primary};
  font-size: 12px;
  font-weight: 700;
  margin-left: auto;
  padding: 10px 25px;
  text-transform: uppercase;

  &:hover,
  &:focus {
    background-color: ${colors.primaryDark}
  }
`;
