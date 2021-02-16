import { ICity } from './city.model';

export interface IProvince {
  id: number;
  name: string;
  kota: ICity[];
}
