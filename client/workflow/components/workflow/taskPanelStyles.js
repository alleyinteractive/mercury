import styled from 'styled-components';
import colors from 'css/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => (props.isActive ? 'auto' : '0')};
`;

export const Header = styled.header`
  align-items: center;
  background: ${(props) => (props.isActive ? colors.blue : colors.white)};
  display: flex;
  width: 100%;
`;

export const HeaderName = styled.span`
  border: none;
  flex-grow: 1;
  text-align: left;
`;

export const HeaderToggle = styled.button`
  align-items: center;
  border: none;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
`;

export const PanelExpaned = styled.div`
  border-top: 1px solid #333;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
