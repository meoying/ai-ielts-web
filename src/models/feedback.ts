interface Feedback {
  id: number;
  biz: string;
  bizID: number;
  content: string;
  status: number;
}

interface FeedbackList {
  feedbacks: Array<Feedback>;
}
