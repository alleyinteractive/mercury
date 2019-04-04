import styled from 'styled-components';
import { ButtonBase } from 'components/helpers/button';

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
  background-color: blue;
  margin-left: auto;
`;
