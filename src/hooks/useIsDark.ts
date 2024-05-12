import { useAntdConfig } from '@umijs/max';
import { theme } from 'antd';
import { useMemo } from 'react';
const { darkAlgorithm } = theme;
export default function useIsDark() {
  const antdConfig = useAntdConfig();
  return useMemo(() => {
    return antdConfig?.theme?.algorithm?.includes(darkAlgorithm);
  }, [() => antdConfig?.theme?.algorithm]);
}
