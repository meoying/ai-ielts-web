import { PageContainer } from '@ant-design/pro-components';
import { Outlet, useLocation } from '@umijs/max';

import React, { useEffect } from 'react';
import './layouts.less';

const Layout: React.FC = (props) => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <>
      {/* <div>Header nav</div> */}
      <div>
        <PageContainer
          header={{ title: '' }}
          pageHeaderRender={() => <div className='text-red'>Header nav</div>}
          breadcrumb={undefined}
        >
          <Outlet />
        </PageContainer>
      </div>
      <div className='bg-rose-900'>Footer nva</div>
    </>
  );
};

export default Layout;
