import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useSelectedTaskSlug } from 'hooks/tasks';
import Header from 'components/task/header';
import Footer from 'components/task/footer';
import Fields from 'components/fields';
import {
  ExpandDown,
  ExpandHeight,
} from 'components/helpers/animations';
import { Wrapper, Form } from './taskStyles.js';

const Task = (props) => {
  const {
    slug,
    name,
    fields,
  } = props;
  const selectedTaskSlug = useSelectedTaskSlug();
  const active = selectedTaskSlug === slug;
  const formRef = useRef(null);

  return (
    <Wrapper>
      <Header
        slug={slug}
        name={name}
      />
      <ExpandHeight
        pose={active ? 'expanded' : 'collapsed'}
        maxHeight={formRef.current
          ? formRef.current.offsetHeight : 0}
      >
        <ExpandDown pose={active ? 'expanded' : 'collapsed'}>
          <Formik
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
            render={(formProps) => {
              const { handleSubmit } = formProps;

              return (
                <Form onSubmit={handleSubmit} ref={formRef}>
                  <div>Due June 3rd</div>
                  <div>
                    Assigned to
                    <button type="button">James Burke</button>
                  </div>
                  <Fields fields={fields} slug={slug} />
                  <Footer />
                </Form>
              );
            }}
          />
        </ExpandDown>
      </ExpandHeight>
    </Wrapper>
  );
};

Task.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
};

export default Task;
