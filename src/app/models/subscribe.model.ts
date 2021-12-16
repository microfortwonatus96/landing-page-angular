export interface ISubscribeBenefit {
  id: number;
  benefit: string;
}

export interface ISubscribe {
  id: number;
  type: string;
  benefitList: ISubscribeBenefit[];
  price: number;
}
