import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Company as CompanyModel } from '../models/Company.model';
import { Invoice } from '../../../invoice/domain/entities/Invoice.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => Invoice, (invoice: Invoice) => invoice.companyUuid)
  uuid: string;

  @Column()
  name: string;

  toDomain(): CompanyModel {
    return CompanyModel.fromPrimitives({
      uuid: this.uuid,
      name: this.name,
    });
  }
}
