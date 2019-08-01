// eslint-disable-next-line import/no-extraneous-dependencies
import { createFetch } from 'yab-fetch';
import { createLogger } from '../src/index';

const request = createFetch();
request.use(createLogger());

request.get('https://jsonplaceholder.typicode.com/todos/1');
