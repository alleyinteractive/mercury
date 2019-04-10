import React from 'react';
import CompleteTask from 'components/task/completeTask';
import Wrapper from './footerStyles';

const Footer = (props) => (
  <Wrapper>
    <CompleteTask {...props} />
  </Wrapper>
);

export default Footer;
