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

export const InlineLabel = styled.label`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const LabelText = styled.span`
  ${label}
  width: 200px;
`;

export const OptionText = styled.span`
  font-size: 12px;
  font-weight: 400;
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

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
