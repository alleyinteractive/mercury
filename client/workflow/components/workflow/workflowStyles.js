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

export const TasksPanel = styled.aside`
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 20%;
`;

export const TaskWrapper = styled.section`
  align-items: stretch;
  background: ${colors.white};
  display: flex;
  flex-grow: 1;
`;
