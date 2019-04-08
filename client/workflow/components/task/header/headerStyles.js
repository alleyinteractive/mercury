import styled from 'styled-components';
import colors from 'css/colors';

export const Wrapper = styled.header`
  align-items: center;
  background-color: ${colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 50px;
  padding: 10px 20px;
  position: relative;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-right: 20px;
`;
