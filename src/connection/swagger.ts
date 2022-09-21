import swaggerUi from 'swagger-ui-express';
import expressSwagger from 'express-swagger-generator';

import {
  getFullPath,
  getFileExtension,
  getAllFilesFromFolder,
} from '../utils/file';
import config from '../config';

interface swaggerConfigIf {
  basedir: any;
  filedir: any;
  files?: any;
  url?: any;
}

const swaggerConfig = (
  appOrRouter,
  { basedir, filedir, files, url }: swaggerConfigIf,
) => {
  // return;
  const fileList = files
    ? files
    : getAllFilesFromFolder(getFullPath(basedir, filedir)).filter(
        (e) => getFileExtension(e) == '.js' || getFileExtension(e) == '.ts',
      );

  let swaggerDocument = expressSwagger(appOrRouter)({
    swaggerDefinition: {
      info: {
        description: 'This is a sample server',
        title: 'Swagger',
        version: '1.0.0',
      },
      servers: [
        { url: 'https://new-dev.artoon.in:6140', description: 'Development' },
        { url: 'http://localhost:6140', description: 'Local' },
      ],
      host: config.SWAGGER_HOST,
      basePath: '/',
      produces: ['application/json', 'application/xml'],
      schemes: ['http', 'https'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
        }
      },
    },
    basedir: basedir, //app absolute path
    files: fileList, //Path to the API handle folder
  });
  // console.log("swaggerDocument : ", JSON.stringify(swaggerDocument))
  appOrRouter.use(
    url ? url : '/api-documents',
    swaggerUi.serveFiles(swaggerDocument, {}),
    swaggerUi.setup(swaggerDocument),
  );
};

export = swaggerConfig;
