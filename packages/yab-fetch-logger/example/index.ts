import { createFetch } from '../../yab-fetch/src';
import { createLogger } from '../src';

const request = createFetch({
  onError: (e) => {
    console.log(`global error handle: ${e}`);
  }
});
request.use(
  createLogger({
    collapsed: false
  })
);

request.get('https://jsonplaceholder.typicode.com/todos/1');

try {
  request.fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'post',
    data: {
      a: 1
    }
  });
} catch (e) {
  console.log(`can not catch the error: ${e}`);
}

// post api: https://jsonplaceholder.typicode.com/guide.html
request.post('https://jsonplaceholder.typicode.com/posts', {
  data: {
    title: 'foo',
    body: 'bar',
    userId: 1
  }
});
