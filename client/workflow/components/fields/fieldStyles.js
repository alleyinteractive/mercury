import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #EEE;
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

export const Input = styled.div`
  width: calc(100% - 200px);

  > * {
    width: 100%;
  }
`;
