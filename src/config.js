require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.API_HOST || 'localhost',
  apiPort: process.env.API_PORT || '',
  apiUrl: typeof window !== 'undefined' && typeof window.location !== 'undefined' && window.location.hostname === 'localhost' ? `http://localhost:${process.env.PORT}` : `https://${process.env.API_HOST}`,
  app: {
    head: {
      htmlAttributes: {
        lang: 'en'
      },
      title: 'react-redux-universal-hot-example-without-prerender',
      meta: [
        {name: 'description', content: ''},
        {charset: 'utf-8'}
      ]
    },
    headNotFound: {
      title: 'Not Found - react-redux-universal-hot-example-without-prerender',
      meta: [
        {name: 'description', content: ''},
        {charset: 'utf-8'}
      ]
    }
  }
}, environment);
