export interface Case {
  id: number;
  title: string;
  utime: string;
  content: string;

  labels: Array<string>;
  keywords: string;
  shorthand: string;
  highlight: string;
  guidance: string;
}

export interface CaseList {
  cases: Array<Case>;
  total: number;
}
