import styled, { css } from 'styled-components';
import colors from 'css/colors';

export const input = css`
  border: 1px solid #CCCCCC;
  height: 42px;
  width: 100%;

  &:hover,
  &:focus {
    border: 1px solid ${colors.primary};
    box-shadow: none;
    outline: 1px solid ${colors.primary};
    outline-offset: 0;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  height: 100%;
  margin-bottom: 1.25rem;
`;

export const Label = styled.label`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const LabelText = styled.span`
  font-size: 12px;
  font-weight: 700;
  margin-right: 10px;
  text-transform: uppercase;
  width: 200px;
`;

export const TextFieldWrapper = styled.div`

  input {
    ${input}
    padding: 5px 10px;
  }
`;

export const SelectWrapper = styled.div`

  select {
    ${input}
    padding: 5px 10px;
  }
`;

export const TextAreaWrapper = styled.div`

  textarea {
    ${input}
    height: 120px;
    padding: 5px 10px;
  }
`;
