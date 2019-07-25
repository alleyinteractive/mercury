import styled from 'styled-components';
import colors from 'css/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: initial;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormHeader = styled.fieldset`
  border-bottom: 4px solid ${colors.grayLight};
  padding: 24px 20px;
`;
