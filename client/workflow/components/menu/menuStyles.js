import styled from 'styled-components';
import { ButtonBase } from 'components/helpers/button';
import breakpoints from 'css/breakpoints';
import colors from 'css/colors';
import { input } from 'components/fields/fieldStyles';
import screenreaderOnly from 'components/helpers/screenreaderOnly';

export const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  width: 35%;

  @media (min-width: ${breakpoints.xl}) {
    width: 25%;
  }

  select {
    ${input}
    display: block;
    font-size: 16px;
    font-weight: 700;
    height: 50px;
    padding: 10px;
  }
`;

export const SelectLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 5px;
  text-transform: uppercase;

  > span {
    ${screenreaderOnly};
  }
`;

export const TaskList = styled.ul`
  align-items: flex-start;
  border-left: 3px solid ${colors.primary};
  display: flex;
  flex-direction: column;
  margin-top: 0;
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
