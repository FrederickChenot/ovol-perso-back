const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'Template API',
    description: 'Documentation du Template api',
  },
  baseDir: __dirname,
  // On analyse tous les fichiers du projet
  filesPattern: ['../routes/**/*.js', '../models/*.js', '../errors/*.js'],
  // URL où sera disponible la page de documentation
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
  // Activation de la documentation à travers une route de l'API
  exposeApiDocs: true,
  apiDocsPath: '/api/docs',
};

/**
 *
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
module.exports = (app) => expressJSDocSwagger(app)(options);
