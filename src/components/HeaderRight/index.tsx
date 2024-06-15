import { getUserInfo, isLogin, logout } from '@/utils';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import React, { useState } from 'react';
import {history} from '@umijs/max';

const HeaderRight: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const profile = getUserInfo();

  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case 'logout':
        logout()
        history.push('/user/login')
        break;
      default:
        break;
    }
    setVisible(false);
  };

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  const menu = () => {
    const items = [
      {
        key: 'logout',
        label: '退出登录',
      }
    ]
    return (
      <Menu onClick={handleMenuClick} items={items}>
      </Menu>
    )
  };

  const login = () => {
    history.push('/user/login')
  };


  return (
    <Space>
      {isLogin()?
      <Dropdown
      dropdownRender={menu}
      trigger={['click']}
      open={visible}
      onOpenChange={handleVisibleChange}
      placement="bottom"
    >
      <div
        className="flex justify-center items-center"
        style={{ marginRight: 15 }}
      >
        <Avatar icon={<UserOutlined />} src={profile?.avatar} />
      </div>
    </Dropdown>
      :
      <Button style={{ marginRight: 15 }} onClick={login}>
      登录
    </Button>}
      {/* <ThemeSwitch /> */}

    </Space>
  );
};

export default HeaderRight;
