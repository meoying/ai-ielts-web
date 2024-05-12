import { matchRoutes, useAppData, useLocation } from '@umijs/max';
import { useEffect, useState } from 'react';

export default function useCurrentRouteName() {
  const location = useLocation();
  const { clientRoutes } = useAppData();
  const [routeName, setRouteName] = useState<string | null>(null);
  const matches = matchRoutes(clientRoutes, location.pathname);
  useEffect(() => {
    const name = (matches?.at(-1) as any).route.name;
    setRouteName(name);
  }, [location]);
  return routeName;
}
