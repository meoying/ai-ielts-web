import React from 'react';
import { Button, Col, Form, Row, Typography, Input, Divider } from 'antd';

interface Props {

}

const Page: React.FC<Props> = (props) => {
  return (
    <>
      <Row>
        <Col offset={1} span={10}>
          <Typography>
            <Typography.Title level={3}>
              输入文章
            </Typography.Title>
          </Typography>
          <Form>
            <Form.Item rules={[{
              required: true,
              message: '请输入题目!',
            }]}>
              <Input.TextArea placeholder={'输入题目'} autoSize={{minRows: 5}}>
              </Input.TextArea>
            </Form.Item>
            <Form.Item rules={[{
              required: true,
              message: '请输入你的作文!',
            }]}>
              <Input.TextArea placeholder={'输入作文'} autoSize={{minRows: 15}}>

              </Input.TextArea>
            </Form.Item>
            <Form.Item>
              <Button style={{float:'right'}} type={'primary'}>开始评分</Button>
            </Form.Item>
          </Form>
        </Col>
        <Col offset={2} span={10}>
          <Typography.Title level={4}>
            AI 评分
          </Typography.Title>
        </Col>
      </Row>
    </>
  )
};

export default Page;