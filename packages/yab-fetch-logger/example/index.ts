import { createFetch } from '../../yab-fetch/src';
import { createLogger } from '../src';

const yab = createFetch({
  onError: (e) => {
    console.log(`global error handle: ${e}`);
  }
});
yab.use(
  createLogger({
    collapsed: true
  })
);

yab.get('https://jsonplaceholder.typicode.com/todos/1?a=1&b=2');

try {
  yab.fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'post',
    data: {}
  });
} catch (e) {
  console.log(`can not catch the error: ${e}`);
}

// post api: https://jsonplaceholder.typicode.com/guide.html
yab.post('https://jsonplaceholder.typicode.com/posts', {
  data: {
    title: 'foo',
    body: 'bar',
    userId: 1
  }
});
