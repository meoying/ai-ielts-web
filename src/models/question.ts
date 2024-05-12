export interface Question {
  id: number;
  title: string;
  utime: string;

  labels: Array<string>;

  content: string;

  analysis: AnswerElement;
  basic: AnswerElement;
  intermediate: AnswerElement;
  advanced: AnswerElement;

  // 类似问题
  similarQS: Array<Question>;
  // 引导问题
  guidanceQS: Array<Question>;
}

export interface AnswerElement {
  id: number;
  content: string;
  keywords: string;
  shorthand: string;
  highlight: string;
  guidance: string;
}

export interface QuestionList {
  questions: Array<Question>;
  total: number;
}

export interface QuestionSet {
  id: number;
  labels: Array<string>;
  title: string;
  description: string;
  utime: string;
  questions: Array<Question>;
}

export interface QuestionSetList {
  questionSets: Array<QuestionSet>;
  total: number;
}
