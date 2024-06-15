import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { theme } from 'antd';
import ms from '@umijs/utils/compiled/debug/ms';

interface Props {
  placeholder?: string
  name?: string
}

const Page: React.FC<Props> = (props) => {
  const msg = props?.placeholder || '请输入密码';
  const { token } = theme.useToken();
  return (
    <ProFormText.Password
      name={props?.name || "password"}
      fieldProps={{
        size: 'large',
        prefix: <LockOutlined className={'prefixIcon'} />,
        strengthText:
          'Password should contain numbers, letters and special characters, at least 8 characters long.',
        statusRender: (value) => {
          const getStatus = () => {
            if (value && value.length > 12) {
              return 'ok';
            }
            if (value && value.length > 6) {
              return 'pass';
            }
            return 'poor';
          };
          const status = getStatus();
          if (status === 'pass') {
            return (
              <div style={{ color: token.colorWarning }}>
                强度：中
              </div>
            );
          }
          if (status === 'ok') {
            return (
              <div style={{ color: token.colorSuccess }}>
                强度：强
              </div>
            );
          }
          return (
            <div style={{ color: token.colorError }}>强度：弱</div>
          );
        },
      }}
      placeholder={msg}
      rules={[
        {
          required: true,
          message: msg,
        },
      ]}
    />
  )
};

export default Page;