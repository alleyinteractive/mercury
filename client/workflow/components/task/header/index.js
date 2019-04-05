import React from 'react';
import PropTypes from 'prop-types';
import { useSelectedTaskSlug } from 'hooks/tasks';
import { setSelectedTaskSlug } from 'services/tasks';
import IconArrow from 'icons/arrow.svg';
import {
  Wrapper,
  Button,
  Name,
  Arrow,
} from './headerStyles';

const Header = (props) => {
  const {
    slug,
    name,
  } = props;
  const selectedTaskSlug = useSelectedTaskSlug();
  const active = selectedTaskSlug === slug;

  return (
    <Wrapper>
      <Button
        onClick={() => {
          if (! active) {
            setSelectedTaskSlug(slug, 'task panel click');
          } else {
            setSelectedTaskSlug('none');
          }
        }}
        type="button"
      >
        <Name>{name}</Name>
        <Arrow isActive={active}>
          <IconArrow />
        </Arrow>
      </Button>
    </Wrapper>
  );
};

Header.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;
