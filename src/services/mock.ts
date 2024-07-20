import { get } from '@/utils/axios';

export function mockCreditAdd() {
  return get<string>('/mock/credit/add')
}