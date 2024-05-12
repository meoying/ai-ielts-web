import { useEffect } from 'react';
import './index.less';
function Index() {
  useEffect(() => {
    console.log('初始化');
  }, []);
  return <div className="container bg-lime-400 mt-4 ml-8 sm:!text-red-600 lg:!text-green-600 text-5xl bg-red">Index init</div>;
}

export default Index;
