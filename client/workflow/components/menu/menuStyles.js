import styled from 'styled-components';
import { ButtonBase } from 'components/helpers/button';
import breakpoints from 'css/breakpoints';
import colors from 'css/colors';

export const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  width: 35%;

  @media (min-width: ${breakpoints.xl}) {
    width: 25%;
  }
`;

export const WorkflowItem = styled.div`
  align-items: center;
  display: flex;
  height: 40px;
  position: relative;
  z-index: 1;
`;

export const ExpandWorkflowMenuButton = styled(ButtonBase)`
  height: 100%;
  padding: 0;
  transform: rotate(${(props) => (props.active ? '0' : '90deg')});
  transition: transform 125ms ease;
  width: 40px;

  &:hover,
  &:focus {

    svg {
      fill: ${colors.primary};
    }
  }
`;

export const ActivateWorkflowButton = styled(ButtonBase)`
  align-items: center;
  background-color: ${colors.white};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  flex-grow: 1;
  height: 100%;
  justify-content: flex-start;
  padding: 10px;
  text-align: left;

  &:hover,
  &:focus {
    background-color: ${colors.primary};
  }
`;

export const MenuList = styled.ul`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-top: 0;
`;

export const WorkflowList = styled(MenuList)`
  padding: 0;
`;

export const TaskList = styled(MenuList)`
  border-left: 3px solid ${colors.primary};
`;

export const WorkflowMenuWrapper = styled.li`
  font-size: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  text-align: left;
  width: 100%;
`;

export const TaskItem = styled.li`
  font-size: 12px;
  margin: 0;
  text-align: left;
  width: 100%;
`;

export const MenuButton = styled(ButtonBase)`
  background-color: ${(props) => (
    props.active ? colors.primary : colors.white
  )};
  min-height: 40px;
  padding: 10px 5px;
  text-align: left;
  width: 100%;

  &:hover,
  &:focus {
    background-color: ${colors.primary};
  }
`;

export const TaskButton = styled(MenuButton)`
  align-items: center;
  display: flex;
  padding-left: 1rem;

  span {
    display: inline-block;
    margin-right: 10px;
  }
`;

export const InProgressIndicator = styled.span`
  background-color: blue;
  display: block;
  height: 20px;
  width: 20px;
`;
