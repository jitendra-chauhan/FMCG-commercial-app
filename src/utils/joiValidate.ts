import joi from 'joi';

interface d {
  error?: joi.ValidationError;
  warning?: joi.ValidationError | undefined;
  value?: undefined;
  errorMessage?: any;
}

function joiValidate(schema, object) {
  const result: d = joi
    .compile(schema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (result.error)
    result.errorMessage = result.error.details
      .map((details) => details.message)
      .join(', ');

  return result;
}

export = joiValidate;
