import { Case } from '@/models/case';
import { Question } from '@/models/question';

export interface Skill {
  id: number;
  labels: Array<string>;
  name: string;
  desc: string;
  basic: SkillLevel;
  intermediate: SkillLevel;
  advanced: SkillLevel;
  utime: string;
}

export interface SkillList {
  skills: Array<Skill>;
  total: number;
}

export interface SkillLevel {
  id: number;
  desc: string;
  questions: Array<Question>;
  cases: Array<Case>;
}
