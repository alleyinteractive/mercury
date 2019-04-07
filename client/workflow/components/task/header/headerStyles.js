import styled from 'styled-components';
import colors from 'css/colors';

export const Wrapper = styled.header`
  align-items: center;
  background-color: ${colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 50px;
  padding: 10px;
  position: relative;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const InProgressIndicator = styled.div`
  background-color: blue;
  height: 30px;
  margin-left: auto;
  width: 30px;
`;
