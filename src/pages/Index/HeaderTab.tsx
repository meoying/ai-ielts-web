import { CompassOutlined } from '@ant-design/icons';
import { history, useLocation } from '@umijs/max';
import { Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
interface Props {}
const HeaderTab: React.FC<Props> = (props) => {
  const [current, setCurrent] = useState('list');
  const location = useLocation();
  useEffect(() => {
    const pathname = location?.pathname;
    let key = location?.pathname?.slice(10);
    if (key == '') {
      key = 'list';
    }
    setCurrent(key);
  }, [location]);
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    history.push({
      pathname: `/question/${e.key}`,
    });
  };
  const items: MenuProps['items'] = [
    {
      label: '题目',
      icon: <CompassOutlined />,
      key: 'list',
    },
    /*    {
      label: '题集',
      icon: <FolderOutlined />,
      key: 'set',
    },*/
  ];
  return (
    <>
      <div className="menu-ctrl">
        <header>
          <Menu
            className="menu-box"
            onClick={onClick}
            defaultSelectedKeys={['list']}
            selectedKeys={[current]}
            mode="vertical"
            items={items}
          />
        </header>
      </div>
    </>
  );
};

export default HeaderTab;
