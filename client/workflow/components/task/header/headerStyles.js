import styled from 'styled-components';
import { ButtonBase } from 'components/helpers/button';

export const Wrapper = styled.header`
  align-items: center;
  background: yellow;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 50px;
  padding: 10px;
  position: relative;
  top: 0;
`;

export const Button = styled(ButtonBase)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Name = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`;

export const Arrow = styled.div`
  margin-left: auto;
  transform: rotate(${(props) => (props.isActive ? '90deg' : '0')});
`;
