import { message, Space, Form, Input, Button } from 'antd';
import React, { useState } from 'react';
import { useIntl, history, FormattedMessage, useModel } from 'umi';
//import Footer from '@/components/Footer';
import { LoginRegister } from '@/services/login';

import styles from './index.less';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};
const formUserRef = React.createRef();

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      values.avator = ''
      const msg = await LoginRegister({ ...values });
      if (msg.code === '0000') {
        message.success('注册成功，快去登录吧！');
        history.goBack()
      } else {
        message.error(msg.message);
      }
    } catch (error) {
      message.error('注册失败，请重试！');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.login}>
          <div className={styles.top}>
            <div className={styles.desc}>网上书籍分析及推荐系统</div>
          </div>
          <div className={styles.main}>
            <Form {...layout} name="basic" ref={formUserRef}
              onFinish={handleSubmit}>
              <Form.Item
                label="用户名"
                name="userName"
                rules={[{ required: true, message: '请输入用户名!' }]}
                getValueFromEvent={(event) => {
                  return event.target.value.replace(/\s+/g, '');
                }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
                getValueFromEvent={(event) => {
                  return event.target.value.replace(/\s+/g, '');
                }}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="确认密码"
                name="pwdAgain"
                rules={[
                  { required: true, message: '请再次输入密码!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('您输入的两个密码不匹配!');
                    },
                  }),
                ]}
                getValueFromEvent={(event) => {
                  return event.target.value.replace(/\s+/g, '');
                }}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="昵称"
                name="uName"
                rules={[{ required: true, message: '请输入昵称!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: '请输入正确的邮箱',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Space>
                  <Button type="primary" htmlType="submit" loading={submitting} >
                    注册
                      </Button>
                  <Button htmlType="button" onClick={() => history.goBack()}>
                    取消
                      </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      {/*<Footer />*/}
    </div >
  );
};

export default Register;
