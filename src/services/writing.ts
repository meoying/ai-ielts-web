import { post } from '@/utils/axios';

export interface ExamineResult {
  tokens: number
  amount: number
  rawResult: string
}

export interface ExamineRequest {
  question:string
  writing: string
}

export function writingExamine(req: ExamineRequest) {
  return post<ExamineResult>('/writing/examine', req)
}