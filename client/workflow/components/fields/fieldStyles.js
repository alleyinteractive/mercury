import styled from 'styled-components';
import { input, label } from 'components/helpers/forms';

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
  ${label}
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
