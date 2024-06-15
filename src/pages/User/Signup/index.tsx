import {
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme } from 'antd';
import Password from '@/pages/User/components/Password';
import { emailSignup, signup } from '@/services/user/user';
import { Result } from '@/utils/axios';

interface Input {
  email: string
  password: string
  confirmPwd: string
  accepted: boolean
}

export default () => {
  const { token } = theme.useToken();
  const register = (vals: Input) => {
    if(vals.password !== vals.confirmPwd) {
      message.error("两次密码输入不一致！")
      return;
    }
    // 没有接受用户协议
    if(!vals.accepted) {
      message.error("请接受用户协议")
      return
    }
    signup(vals).then(res => {
      debugger
      const data= res?.data || {}
      if(data?.code == 0) {
        message.success('注册成功')
      } else {
        message.error(data?.msg ||'系统错误')
      }
    })
  }

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo="https://github.githubassets.com/favicons/favicon.png"
          title="AI-IELTS"
          subTitle="AI，让 IELTS 更轻松"
          submitter={{searchConfig: {submitText: '注册'}}}
          onFinish={register}
        >
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'请输入邮箱'}
              rules={[
                {
                  required: true,
                  message: '请输入邮箱!',
                },
              ]}
            />
            <Password />
            <Password placeholder={'请确认密码！'} name={'confirmPwd'}/>
          </>
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="accepted">
              同意用户协议
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
