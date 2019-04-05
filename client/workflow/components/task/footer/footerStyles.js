import styled from 'styled-components';
import colors from 'css/colors';

const Wrapper = styled.footer`
  background: ${colors.grayLight};
  bottom: 0;
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  padding: 10px;
  position: relative;
`;

export default Wrapper;
