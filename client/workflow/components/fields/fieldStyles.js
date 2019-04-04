import styled, { css } from 'styled-components';

const input = css`
  border: 1px solid #CCCCCC;
  width: 100%;
  height: 42px;
`;

export const InputWrapper = styled.div`
  width: calc(100% - 200px);
`;

export const Wrapper = styled.div`
  height: 100%;
  padding: 10px;
`;

export const Label = styled.label`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;

export const LabelText = styled.span`
  font-size: 16px;
  margin-right: 10px;
  text-align: right;
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
