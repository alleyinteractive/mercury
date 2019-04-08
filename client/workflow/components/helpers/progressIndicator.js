import React from 'react';
import styled from 'styled-components';
import ClockIcon from 'icons/clock.svg';
import colors from 'css/colors';

const Wrapper = styled.div`
  align-items: center;
  display: flex;

  svg {
    fill: ${colors.secondary};
    height: 16px;
    margin-right: 5px;
    width: 16px;
  }
`;

const Text = styled.div`
  color: ${colors.secondary};
  font-size: 10px;
  text-transform: uppercase;
`;

const ProgressIndicator = () => (
  <Wrapper>
    <ClockIcon />
    <Text>In Progress</Text>
  </Wrapper>
);

export default ProgressIndicator;
