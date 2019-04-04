import React from 'react';
import { useSelectedTaskSlug } from 'hooks/tasks';
import { getTask } from 'services/tasks';
import './header.css';

const Header = () => {
  const selectedTaskSlug = useSelectedTaskSlug();
  const { name } = getTask(selectedTaskSlug);

  return (
    <header className="mercury__task__header">
      <section className="mercury__task__header__left">
        <div className="mercury__task__header__name">{name}</div>
      </section>
      <section className="mercury__task__header__right">
        <div className="mercury__task__header__due-date">Due June 3rd</div>
        <div className="mercury__task__header__assignee">
          Assigned to
          <button type="button">James Burke</button>
        </div>
      </section>
    </header>
  );
};

export default Header;
