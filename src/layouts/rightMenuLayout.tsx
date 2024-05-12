import CollapsedBtn from '@/components/CollapsedBtn';
import { history } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Avatar, ConfigProvider, Drawer, Menu, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import './layouts.less';
const { Title } = Typography;
const rightMenu: React.FC<{ renderDom: React.ReactNode; data: any }> = ({
  renderDom,
  data,
}) => {
  const [openKeys, setOpenKeys] = useState(
    '/' + data.location.pathname?.split('/')?.at(1),
  );

  function newMenuData() {
    return data.menuData.map((item: any) => {
      if (item.children) {
        item.children = item.children.map((child: any) => {
          const { pro_layout_parentKeys, ...arg } = child;
          return {
            ...arg,
            key: child.key,
            label: child.name,
            icon: child.icon,
          };
        });
      }
      const menuData = {
        key: item.path,
        label: item.name,
        icon: item.icon,
      };
      if (item.children) {
        menuData.children = item.children;
      }
      return menuData;
    });
  }

  const menu = useMemo(() => {
    return newMenuData();
  }, [() => data.menuData]);

  const width = useMemo(() => {
    return data.collapsed ? 48 : 210;
  }, [data.collapsed]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) =>
    setOpenKeys(keys.at(-1));

  const menuNode = () => (
    <div
      className={`bg-white h-full w-full overflow-auto box-border relative menu-scroll ${data.isMobile ? '' : 'mt-[56px]'} `}
    >
      <div
        className={`h-16 gap-x-2 flex items-center w-full ${data.collapsed ? '' : 'px-6'} pt-4 hidden`}
      >
        <div className="ml-[6px]">
          <Avatar size="default" src={data.logo} />
        </div>
        <div className={`${!data.collapsed ? '' : 'hidden'}`}>
          <Title className="!mb-0" level={5}>
            {data.title}
          </Title>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              // itemSelectedBg:'#4281FF',
              // itemColor:'#959EC4',
              itemSelectedColor: '#8F44EB',
            },
          },
        }}
      >
        <Menu
          style={{ width: width }}
          items={menu}
          mode="inline"
          onOpenChange={onOpenChange}
          inlineCollapsed={data.collapsed}
          defaultSelectedKeys={[data.location.pathname]}
          openKeys={[openKeys]}
          onClick={(e) => {
            if (data.isMobile) {
              data.onCollapse(true);
            }
            history.push(e.key);
          }}
        />
      </ConfigProvider>
    </div>
  );

  return data.isMobile ? (
    <Drawer
      placement="left"
      open={!data.collapsed}
      onClose={() => data.onCollapse(!data.collapsed)}
      width={240}
      bodyStyle={{ padding: '0px' }}
    >
      {menuNode()}
    </Drawer>
  ) : (
    <aside
      className={`z-10 relative bg-[#F2F6FB] ${data.isMobile ? ' hidden' : ''} `}
      style={{ height: 'calc(100vh - 0px)' }}
    >
      <CollapsedBtn
        collapsed={data.collapsed}
        setCollapsed={() => {
          data.onCollapse(!data.collapsed);
        }}
      ></CollapsedBtn>
      {menuNode()}
    </aside>
  );
};

export default rightMenu;
