import React from 'react';
import PropTypes from 'prop-types';
import ProgressIndicator from 'components/helpers/progressIndicator';
import {
  Wrapper,
  Name,
} from './headerStyles';

const Header = (props) => {
  const { name, inProgress } = props;

  return (
    <Wrapper>
      <Name>{name}</Name>
      {inProgress && <ProgressIndicator />}
    </Wrapper>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  inProgress: PropTypes.bool.isRequired,
};

export default Header;
