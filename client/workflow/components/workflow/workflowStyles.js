import styled from 'styled-components';
import colors from 'css/colors';

export const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  min-height: 500px;

  * {
    box-sizing: border-box;
  }
`;

export const TaskWrapper = styled.section`
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  width: 100%;
`;
