import styled from 'styled-components';
import {
  input,
  label,
  secondaryLabel,
} from 'components/helpers/forms';
import colors from 'css/colors';

export const InputWrapper = styled.div`
  width: 100%;
  /* Label wrapper overrides */
  ${(props) => props.theme.inputWrapper}

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

  /* Label wrapper overrides */
  ${(props) => props.theme.labelWrapper}
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

  /* Label overrides */
  ${(props) => props.theme.label}
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
