/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import TaskPanel from '../TaskPanel';
import Field from '../Field';
import Footer from '../Footer';
import { getMeta, setMeta } from '../../services/fieldHelpers';
import './workflow.css';

const Workflow = (props) => {
  const {
    name,
    slug,
    tasks,
    workflows,
  } = props;

  // Setup local state.
  const [
    activeTaskSlug,
    setActiveTaskSlug,
  ] = useState(getMeta('mercury_active_task_slug'));

  const [
    viewingTaskSlug,
    setViewingTaskSlug,
  ] = useState(getMeta('mercury_active_task_slug'));

  const [
    nextTaskSlug,
    setNextTaskSlug,
  ] = useState('');

  /**
   * Get a task in the current workflow by slug.
   *
   * @param  {string} taskSlug Task slug.
   * @return {object}          Task object.
   */
  const getTaskBySlug = (taskSlug) => {
    return tasks.find((task) => task.slug === taskSlug);
  }

  /**
   * Get the active task.
   *
   * @return {object} Task object.
   */
  const getActiveTask = () => {
    return getTaskBySlug(activeTaskSlug);
  }

  /**
   * Get the task currently being viewed.
   *
   * @return {object} Task object.
   */
  const getViewingTask = () => {
    return getTaskBySlug(viewingTaskSlug);
  }

  /**
   * Complete the current task.
   */
  const completeTask = () => {
    // Store updates in post meta.
    setMeta(`${activeTaskSlug}-status`, 'completed');
    setMeta('mercury_active_task_slug', nextTaskSlug);

    // Update views locally.
    setActiveTaskSlug(nextTaskSlug);
    setViewingTaskSlug(nextTaskSlug);
    setNextTaskSlug(getTaskBySlug(nextTaskSlug).nextTasks[0].slug);
  }

  // If the tasks change, ensure that active and viewing are still valid.
  useEffect(() => {
    if (! getActiveTask()) {
      setActiveTaskSlug(tasks[0].slug);
      setMeta('mercury_active_task_slug', tasks[0].slug);
      setNextTaskSlug(tasks[0].nextTasks[0].slug);
    } else {
      setNextTaskSlug(getActiveTask().nextTasks[0].slug);
    }

    // Invalid viewing task.
    if (! getViewingTask()) {
      setViewingTaskSlug(tasks[0].slug);
    }
  }, [tasks]);

  /**
   * Get the TaskPanel components for the current workflow.
   *
   * @return {array} TaskPanels.
   */
  const getTaskPanels = () => {
    return tasks.map((task) => {
      return (
        <TaskPanel
          {...task}
          isActive={task.slug === activeTaskSlug}
          isViewing={task.slug === viewingTaskSlug}
          setViewingTaskSlug={setViewingTaskSlug}
        />
      );
    });
  }

  /**
   * Display the task fields.
   *
   * @return {array} Array of <Field> components.
   */
  const getTaskFields = () => {
    return getViewingTask().fields.map((field) => (
      <Field {...field} />
    ));
  }

  // Ensure we have valid data.
  if (0 === tasks.length || ! getViewingTask()) {
    return (
      <div>Loading Tasks</div>
    );
  }

  return (
    <div className="mercury__wrapper">
      <aside className="mercury__tasks">
        {getTaskPanels()}
      </aside>
      <section className="mercury__settings__wrapper">
        <Formik
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <section className="mercury__settings">
                {getTaskFields()}
                <button type="submit">
                  Submit
                </button>
              </section>
              <Footer
                key={getViewingTask().slug}
                {...getViewingTask()}
                isActive={getViewingTask().slug === activeTaskSlug}
                isViewing={getViewingTask().slug === viewingTaskSlug}
                nextTaskSlug={nextTaskSlug}
                setNextTaskSlug={setNextTaskSlug}
                completeTask={completeTask}
              />
            </form>
          )}
        />
      </section>
    </div>
  );
};

Workflow.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  workflows: PropTypes.object.isRequired,
};

export default Workflow;
