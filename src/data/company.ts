import companyJson from '../../company.json';
import { CompanyData } from './types';

export const companyData: CompanyData = companyJson as CompanyData;

export function getCompanyData(): CompanyData {
  return companyData;
}
