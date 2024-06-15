import { PageContainer } from '@ant-design/pro-components';
import { Outlet, useLocation } from '@umijs/max';

import React, { useEffect } from 'react';

const Layout: React.FC = (props) => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <>
       {/*<div>Header nav</div>*/}
      <div>
        <PageContainer
          header={{ title: '' }}
          // pageHeaderRender={() => <div className='text-red'>Header nav</div>}
          breadcrumb={undefined}
        >
          <Outlet />
        </PageContainer>
      </div>
    </>
  );
};

export default Layout;
