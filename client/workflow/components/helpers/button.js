import styled from 'styled-components';

export const ButtonBase = styled.button`
  appearance: none;
  background-color: transparent;
  border: 0;
  min-height: 40px;
  display: block;
`;

export const PrimaryButton = styled(ButtonBase)`
  background-color: green;
`;
