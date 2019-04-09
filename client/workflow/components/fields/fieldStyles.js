import styled from 'styled-components';
import { input, label } from 'components/helpers/forms';
import colors from 'css/colors';

export const InputWrapper = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  margin-bottom: 1.25rem;
`;

export const Label = styled.label`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

export const InlineLabel = styled.label`
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
  line-height: 16px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  input {
    line-height: 16px;
    margin: 0 5px 0 0;
  }
`;

export const LabelText = styled.span`
  ${label}
  width: 200px;

  span {
    color: ${colors.gray};
    display: inline-block;
    font-size: 10px;
    font-weight: 400;
    margin-left: 5px;
    text-transform: uppercase;
  }
`;

export const OptionText = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

export const ReadOnlyText = styled.div`
  background-color: ${colors.grayLight};
  font-size: 12px;
  font-weight: 400;
  padding: 5px;
  width: 100%;

  strong {
    font-weight: 700;
  }
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
