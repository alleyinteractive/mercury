import * as Yup from 'yup';

/**
 * Yup schema for validation task form fields
 *
 * @param {object} fields - Fields from mercury API that require validation
 */
export default function getValidationSchema(task) {
  const { fields, slug: taskSlug } = task;
  const schemaShape = fields.reduce((acc, field) => {
    const {
      slug,
      type,
      required,
      requiredMessage = 'This is a required field',
    } = field;
    let fieldSchema;

    switch (type) {
      case 'checkbox':
        fieldSchema = Yup.boolean();

        if (required) {
          fieldSchema = fieldSchema
            .oneOf([true], 'This checkbox must be checked');
        }
        break;

      case 'checkboxes':
        fieldSchema = Yup.array().of(Yup.string());

        if (required) {
          fieldSchema = fieldSchema.required(requiredMessage);
        }
        break;

      default:
        fieldSchema = Yup.string();

        if (required) {
          fieldSchema = fieldSchema.required(requiredMessage);
        }
        break;
    }

    return {
      ...acc,
      [slug]: fieldSchema,
    };
  }, {});

  return Yup.object().shape({
    [`mercury_${taskSlug}_assignee_id`]: Yup.number(),
    'next-task-slug': Yup.string(),
    ...schemaShape,
  });
}
