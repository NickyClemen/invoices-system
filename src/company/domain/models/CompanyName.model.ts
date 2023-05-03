import { ObjectValue } from '../../../../shared/domain/ObjectValue';
export class CompanyName extends ObjectValue<string> {
  constructor(private companyName: string) {
    super(companyName);
  }
}
