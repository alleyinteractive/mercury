import React from 'react';
import { useSelectedTaskSlug } from 'hooks/tasks';
import { getTask } from 'services/tasks';
import {
  Wrapper,
  Section,
  Right,
  Name,
} from './headerStyles.js';

const Header = () => {
  const selectedTaskSlug = useSelectedTaskSlug();
  const { name } = getTask(selectedTaskSlug);

  return (
    <Wrapper>
      <Section>
        <Name>{name}</Name>
      </Section>
      <Right>
        <div>Due June 3rd</div>
        <div>
          Assigned to
          <button type="button">James Burke</button>
        </div>
      </Right>
    </Wrapper>
  );
};

export default Header;
