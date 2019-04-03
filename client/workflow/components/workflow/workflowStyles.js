import styled from 'styled-components';
import colors from 'css/colors';

export const Wrapper = styled.div`
  display: flex;

  * {
    box-sizing: border-box;
  }
`;

export const TasksPanel = styled.aside`
  background: ${colors.white};
  width: 20%;
`;

export const TaskWrapper = styled.section`
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
