import React, { useState } from 'react';
import { Button, Col, Form, Row, Typography, Input, Divider, message } from 'antd';
import { ExamineRequest, ExamineResult, writingExamine } from '@/services/writing';
import ReactMarkdown from 'react-markdown';

interface Props {

}

const onFinishFailed = (values: any) => {
  const { errorFields } = values;
  if (errorFields.length > 0) {
    let item = errorFields[0];
    message.error(item.errors[0]);
  }
};


const Page: React.FC<Props> = (props) => {
  const [form] = Form.useForm<ExamineRequest>()
  const [res, setRes] = useState<ExamineResult>()
  const examine=()=> {
    const vals = form.getFieldsValue()
    writingExamine(vals).then(res => {
      const data: ExamineResult = res?.data?.data || {}
      setRes(data)
    })
  }
  return (
    <>
      <Row>
        <Col offset={2} span={20}>
          <Typography>
            <Typography.Title level={3}>
              输入文章
            </Typography.Title>
          </Typography>
          <Form
            onFinish={examine}
            onFinishFailed={onFinishFailed}
            form={form}>
            <Form.Item
            name={'question'}
              rules={[{
              required: true,
              message: '请输入题目!',
            }]}>
              <Input.TextArea placeholder={'输入题目'} autoSize={{minRows: 5}}>
              </Input.TextArea>
            </Form.Item>
            <Form.Item
            name={'writing'}
              rules={[{
              required: true,
              message: '请输入你的作文!',
            }]}>
              <Input.TextArea placeholder={'输入作文'} autoSize={{minRows: 15}}>

              </Input.TextArea>
            </Form.Item>
            <Form.Item>
              <Button style={{float:'right'}} htmlType={'submit'} type={'primary'}>开始评分</Button>
            </Form.Item>
          </Form>

          <Typography.Title level={4}>
            AI 评分
          </Typography.Title>
          {res?.amount > 0 && <Typography>
            <ReactMarkdown>
              {res}
            </ReactMarkdown>
          </Typography>}
        </Col>
      </Row>
    </>
  )
};

export default Page;