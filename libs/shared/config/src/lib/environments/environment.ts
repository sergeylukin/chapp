const ENV = process.env['NODE_ENV'];
const API_HOST = process.env['NX_API_HOST']
  ? process.env['NX_API_HOST']
  : 'localhost';
const API_PORT = process.env['NX_API_PORT']
  ? `:${process.env['NX_API_PORT']}`
  : '';

const API_BASEHOST =
  ENV === 'production'
    ? API_HOST === 'chapp-api'
      ? 'chapp-api.sergeylukin.com'
      : `${API_HOST}.onrender.com`
    : API_HOST;

const API_SCHEMA = ENV === 'development' ? 'http://' : 'https://';

export const environment = {
  production: process.env['NODE_ENV'] === 'production',
  API_BASEURL: `${API_SCHEMA}${API_BASEHOST}${API_PORT}/`,
};
