import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import Select from 'components/fields/select';
import {
  Wrapper,
  Submit,
  Label,
} from './completeTaskStyles';

const CompleteTask = (props) => {
  const {
    errors,
    inProgressTaskSlug,
    selectedTaskSlug,
    nextTaskSlug,
    nextTasks,
  } = props;

  const getButtonLabel = () => {
    if (1 === nextTasks.length) {
      return nextTasks[0].label;
    }
    return 'Submit';
  };

  return (
    <Wrapper>
      {1 < nextTasks.length ? (
        <Label htmlFor="next-task-slug">
          <span>Actions: </span>
          <Select
            slug="next-task-slug"
            optionsSourceList={nextTasks.map((task) => ({
              label: task.label,
              value: task.slug,
            }))}
            value={nextTaskSlug}
            disabled={inProgressTaskSlug !== selectedTaskSlug}
          />
        </Label>
      ) : (
        <Field
          type="hidden"
          name="next-task"
        />
      )}
      <Submit
        type="submit"
        disabled={
          (inProgressTaskSlug !== selectedTaskSlug)
          || !! Object.keys(errors).length
        }
      >
        {getButtonLabel()}
      </Submit>
    </Wrapper>
  );
};

CompleteTask.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  inProgressTaskSlug: PropTypes.string.isRequired,
  selectedTaskSlug: PropTypes.string.isRequired,
  nextTaskSlug: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  nextTasks: PropTypes.array.isRequired,
};

export default CompleteTask;
