import { Suspense, lazy } from 'react';
import { Link, useData, useConfig } from 'ice';
// not recommended but works
import { useAppContext } from '@ice/runtime';
import { useRequest } from 'ahooks';
import styles from './index.module.css';

const Bar = lazy(() => import('../components/bar'));

export default function Home(props) {
  console.log('render Home', props);

  const appContext = useAppContext();
  console.log('get AppContext', appContext);

  const data = useData();
  const config = useConfig();

  console.log('render Home', 'data', data, 'config', config);

  const { data: foo } = useRequest(() => fetch('/api/foo').then(res => res.json()));
  const { data: users } = useRequest(() => fetch('/api/users').then(res => res.json()));
  const { data: userInfo } = useRequest(() => fetch('/api/users/a', { method: 'POST' }).then(res => res.json()));
  return (
    <>
      <h2
        className={styles.title}
        style={{
          fontSize: '75rpx',
          zIndex: 2,
          height: 200,
        }}
      >Home Page</h2>
      <Link to="/about">about</Link>
      <div>count: {data.count}</div>
      <Suspense fallback={<div>hello</div>}>
        <Bar />
      </Suspense>
      <div className={styles.data}>
        <div>foo: {JSON.stringify(foo)}</div>
        <div>users: {JSON.stringify(users)}</div>
        <div>userInfo: {JSON.stringify(userInfo)}</div>
      </div>
    </>
  );
}

export function getConfig() {
  return {
    title: 'Home',
    meta: [
      {
        name: 'theme-color',
        content: '#000',
      },
      {
        name: 'title-color',
        content: '#f00',
      },
    ],
    auth: ['admin'],
  };
}

export function getData({ pathname, query }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Home',
        count: 100,
        pathname,
        query,
      });
    }, 1 * 100);
  });
}
