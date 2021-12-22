export interface IReferralCode {
  code?: string;
  email?: string;
  name?: string;
  phone: string;
  point: number;
  //masking: boolean;//
}

export interface IEvent {
  id: number;
  name: string;
  title: string;
  description: string;
  dateFrom: number;
  dateTo: number;
  dateCreated: number;
  dateUpdated: number;
  logs: [];
  termAndConditions: IConditions[];
}
export interface IConditions {
  id: number;
  description: string;
  dateCreated: number;
  dateUpdated: number;
}
export interface TermCondition {
  dateCreated: number;
  dateUpdated: number;
  description: string;
  id: number;
}

export interface IReferralEvent {
  dateCreated: number;
  dateFrom: number;
  dateTo: number;
  dateUpdated: number;
  description: string;
  id: number;
  lastModifiedBy: number;
  log: [];
  name: string;
  termAndConditions: TermCondition[];
  title: string;
}
