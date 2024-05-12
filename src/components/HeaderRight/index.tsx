import { wechatLoginURL } from '@/services/user/user';
import { getUserInfo, isLogin, loginOut } from '@/utils';
import { Result } from '@/utils/axios';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import React, { useState } from 'react';

const HeaderRight: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const profile = getUserInfo();

  const handleMenuClick = (e: any) => {
    switch (e.key) {
      case 'logout':
        loginOut();
        break;
      case 'creator':
        window.location.href = '/creator';
        break;
      default:
        break;
    }
    setVisible(false);
  };

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  const menu = () => (
    <Menu onClick={handleMenuClick}>
      {(profile?.isCreator || false) && (
        <Menu.Item key="creator">创作中心</Menu.Item>
      )}
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  );

  const login = () => {
    wechatLoginURL()
      .then((res) => res?.data)
      .then((res: Result<string>) => {
        if (res?.data) {
          window.location.href = res?.data;
        }
      });
  };

  if (isLogin()) {
    return (
      <Space>
        {/* <ThemeSwitch /> */}
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
      </Space>
    );
  }

  return (
    <Space>
      {/* <ThemeSwitch /> */}
      <Button style={{ marginRight: 15 }} onClick={login}>
        登录
      </Button>
    </Space>
  );
};

export default HeaderRight;
