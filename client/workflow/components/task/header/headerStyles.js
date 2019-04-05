import styled from 'styled-components';
import { ButtonBase } from 'components/helpers/button';
import colors from 'css/colors';

export const Wrapper = styled.header`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: 0;
`;

export const Button = styled(ButtonBase)`
  align-items: center;
  background-color: ${colors.primary};
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  padding: 10px;
  width: 100%;

  &:hover,
  &:focus {
    background-color: ${colors.primaryDark};
  }
`;

export const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const Arrow = styled.div`
  margin-left: auto;
  transform: rotate(${(props) => (props.isActive ? '90deg' : '0')});
`;
