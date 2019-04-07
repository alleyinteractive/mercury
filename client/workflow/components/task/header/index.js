import React from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper,
  Name,
  InProgressIndicator,
} from './headerStyles';

const Header = (props) => {
  const { name, inProgress } = props;

  return (
    <Wrapper>
      <Name>{name}</Name>
      {inProgress && <InProgressIndicator />}
    </Wrapper>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  inProgress: PropTypes.bool.isRequired,
};

export default Header;
