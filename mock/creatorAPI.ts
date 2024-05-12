const labels = [
  { name: '标签一', id: 1 },
  { name: '标签二', id: 2 },
  { name: '标签嘿嘿嘿', id: 3 },
];

const queryQuestionList = [
  { name: '题集一', id: 1 },
  { name: '题集二', id: 2 },
  { name: '题集嘿嘿嘿', id: 3 },
];

export default {
  'GET /api/v1/queryLabelList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: labels },
      errorCode: 0,
    });
  },

  'GET /api/v1/queryQuestionList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: queryQuestionList },
      errorCode: 0,
    });
  },

  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
