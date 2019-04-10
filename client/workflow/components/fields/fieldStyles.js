import styled from 'styled-components';
import {
  input,
  label,
  secondaryLabel,
} from 'components/helpers/forms';
import colors from 'css/colors';

export const InputWrapper = styled.div`
  width: 100%;

  [type="text"] {
    ${input}
    padding: 5px 10px;
  }

  select {
    ${input}
    padding: 5px 10px;
  }

  textarea {
    ${input}
    height: 120px;
    padding: 5px 10px;
  }
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  margin-bottom: 1.25rem;
`;

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const LabelWrapper = styled.div`
  display: block;
  line-height: 16px;
`;

export const Label = styled.label`
  border: 1px solid ${(props) => (
    props.error ? colors.secondary : 'transparent'
  )};
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px;
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
`;

export const OptionText = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

export const ReadOnlyText = styled.div`
  background-color: ${colors.grayLight};
  font-size: 12px;
  font-weight: 400;
  width: 100%;

  strong {
    font-weight: 700;
  }
`;

export const ReadOnlyLabel = styled.span`
  ${secondaryLabel}
  color: ${colors.gray};
`;

export const RequiredLabel = styled.span`
  ${secondaryLabel}
  color: ${colors.secondary};
`;

export const ErrorText = styled.span`
  color: ${colors.secondary};
  font-size: 13px;
  font-weight: 600;
  padding-top: 5px;
`;
