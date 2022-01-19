import { Money } from './shared';

export type Account = {
  "id": string;
  "name": string;
  "country": string;
  "salary": Money;
  "phones": string[];
};
