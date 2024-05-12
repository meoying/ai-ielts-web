import { mockLogin } from '@/services/user/user';
import { history } from '@umijs/max';
import React from 'react';

interface Props {}

const Page: React.FC<Props> = (props) => {
  mockLogin().then((res) => {
    history.push('/');
    location.reload();
  });
};

export default Page;
