import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import ApiError from '../utils/ApiError';

// dotenv.config({
//   path: path.join(__dirname, '../.env'),
// });
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
  email: {
    accessKey: envVars.SES_ACCESS_KEY,
    secretKey: envVars.SES_SECRET_KEY,
  },
  s3: {
    bucketName: envVars.S3_BUCKET_NAME,
    region: envVars.S3_REGION,
    accessKey: envVars.S3_ACCESS_KEY,
    secretKey: envVars.S3_SECRET_KEY,
    basedUrl: envVars.S3_BASE_URL,
    endpoint: envVars.S3_ENDPOINT,
  },
  AWS: {
    region: envVars.AWS_REGION,
    apiVersion: envVars.AWS_APIVERSION,
    accessKeyId: envVars.SES_ACCESS_KEY,
    secretAccessKey: envVars.SES_SECRET_KEY,
  },
  AGORA: {
    app_id: envVars.AGORA_APP_ID,
    app_certificate: envVars.AGORA_APP_CERTI,
    key: envVars.AGORA_KEY,
    secret: envVars.AGORA_SECRET,
  },
  SWAGGER_HOST: envVars.SWAGGER_HOST,
  ENV_CONFIG: envVars.ENV_CONFIG,
};

export = exportObject;
