import { CompanyName } from './CompanyName.model';
import { Uuid } from '../../../../shared/domain/Uuid';

export type CompanyPrimitives = {
  uuid: string;
  name: string;
};

export type CreateCompanyPrimitives = Partial<CompanyPrimitives>;

export class Company {
  private uuid: Uuid;
  private name: CompanyName;
  constructor(company: CompanyPrimitives) {
    this.uuid = new Uuid(company.uuid);
    this.name = new CompanyName(company.name);
  }
  toPrimitives(): CompanyPrimitives {
    return {
      uuid: this.uuid.getValue(),
      name: this.name.getValue(),
    };
  }

  static fromPrimitives(company: CompanyPrimitives): Company {
    return new Company(company);
  }
}
