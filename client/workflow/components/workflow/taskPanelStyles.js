import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #CCC;

  &:last-of-child {
    margin: none;
  }

  &[data-active="true"] button {
    background: #EEE;
  }

  &[data-viewing="true"] button {
    background: #AAA;
  }
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
`;

export const HeaderName = styled.button`
  border: none;
  flex-grow: 1;
  padding: 10px;
`;

export const HeaderToggle = styled.button`
  border: none;
  padding: 10px;
  width: 40px;
`;

export const PanelExpaned = styled.div`
  border-top: 1px solid #333;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
