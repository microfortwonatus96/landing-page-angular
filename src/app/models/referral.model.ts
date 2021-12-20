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
