import styled from 'styled-components';

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

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Right = styled(Section)`
  text-align: right;
`;

export const Name = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`;
