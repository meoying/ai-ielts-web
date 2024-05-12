import { useLocation } from '@umijs/max';
import { useEffect, useState } from 'react';

export default function useCurrentRouteName() {
  const location = useLocation();
  const whiteRoutes = ['/detail'];
  const [headerStatus, setHeaderStatus] = useState<boolean>(false);
  useEffect(() => {
    setHeaderStatus(whiteRoutes.includes(location.pathname));
  }, [location]);
  return headerStatus;
}
