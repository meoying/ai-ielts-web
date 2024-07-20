import React from 'react';
import { Button, message, Space } from 'antd';
import { mockCreditAdd } from '@/services/mock';

interface Props {

}

const Page: React.FC<Props> = (props) => {
  const addCredit = () => {
    mockCreditAdd().then(res => {
      message.success('增加积分成功')
    })
  }
  return <div>
    <Space>
      <Button onClick={addCredit}>增加积分</Button>
    </Space>
  </div>
};

export default Page;