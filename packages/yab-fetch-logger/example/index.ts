// eslint-disable-next-line import/no-extraneous-dependencies
import { createFetch } from 'yab-fetch';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger } from '../src';

const request = createFetch();
request.use(createLogger());

request.get('https://jsonplaceholder.typicode.com/todos/1');

request.post('https://jsonplaceholder.typicode.com/todos/1', {
  data: {
    a: 1
  }
});
