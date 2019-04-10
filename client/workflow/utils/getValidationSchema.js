import * as Yup from 'yup';

/**
 * Yup schema for validation task form fields
 *
 * @param {object} fields - Fields from mercury API that require validation
 */
export default function getValidationSchema(fields) {
  const schemaShape = fields.reduce((acc, field) => {
    const {
      slug,
      type,
      required,
    } = field;
    let fieldSchema;

    switch (type) {
      case 'checkbox':
        fieldSchema = Yup.boolean();
        break;

      case 'checkboxes':
        fieldSchema = Yup.array().of(Yup.string());
        break;

      default:
        fieldSchema = Yup.string();
        break;
    }

    if (required) {
      fieldSchema = fieldSchema.required();
    }

    return {
      ...acc,
      [slug]: fieldSchema,
    };
  }, {});

  return Yup.object().shape(schemaShape);
}
