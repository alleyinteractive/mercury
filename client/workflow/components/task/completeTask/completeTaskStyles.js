import styled from 'styled-components';
import { ButtonBase } from 'components/helpers/button';
import colors from 'css/colors';
import { input, select, label } from 'components/helpers/forms';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  select {
    ${input}
    ${select}
    padding: 5px 10px;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;

  span {
    ${label}
  }
`;

export const Submit = styled(ButtonBase)`
  background-color: ${colors.primary};
  font-size: 12px;
  font-weight: 700;
  height: 42px;
  margin: auto 0 0 auto;
  padding: 10px 25px;
  text-transform: uppercase;

  &:hover,
  &:focus {
    background-color: ${colors.primaryDark}
  }
`;
