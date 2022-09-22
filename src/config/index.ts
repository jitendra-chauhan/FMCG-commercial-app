import dotenv from 'dotenv';
import Joi from 'joi';
import ApiError from '../utils/ApiError';

dotenv.config();

console.log('dotenv', dotenv);
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    MASTER_DB: Joi.string().required().description('Mongo Master DB Name'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: 'key',
    },
  })
  .validate(process.env);
if (error) {
  throw new ApiError(`Config validation error: ${error.message}`);
}
console.log(envVars.MONGODB_URL, envVars.MASTER_DB);
const exportObject = {
  env: envVars.NODE_ENV,
  ENVIRONMENT: envVars.ENVIRONMENT,
  port: envVars.PORT,

  PROD_BASE_URL: envVars.PROD_BASE_URL,
  VALID_OTP: envVars.VALID_OTP,
  mongoose: {
    url: envVars.MONGODB_URL,
    master_db: envVars.MASTER_DB,
    options: {
      // useCreateIndex: true,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
    withReminderUserLoginExpirationHours:
      envVars.JWT_WITH_RE_USER_EXPIRATION_HOURS,
    withoutReminderUserLoginExpirationHours:
      envVars.JWT_WITHOUT_RE_USER_EXPIRATION_HOURS,
  },
  SWAGGER_HOST: envVars.SWAGGER_HOST,
  ENV_CONFIG: envVars.ENV_CONFIG,
  FILES: envVars.FILES,
};

export = exportObject;
