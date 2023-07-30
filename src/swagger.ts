// src/swagger.ts
import * as yaml from 'yamljs';

export const swaggerDocument = yaml.load('./swagger/swagger.yaml');
export const swaggerUiOptions = {
    customSiteTitle: 'Your API Documentation',
};
