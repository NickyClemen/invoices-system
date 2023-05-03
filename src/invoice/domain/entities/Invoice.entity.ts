import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Invoice as InvoiceModel } from '../models/Invoice.model';
import { Company } from '../../../company/domain/entities/Company.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  readonly uuid: string;

  @Column()
  amount: number;

  @Column()
  expirationDate: Date;

  @Column({ nullable: true })
  readonly description: string;

  @ManyToOne(() => Company, (company: Company) => company.uuid)
  companyUuid: string;

  static toDomain(invoiceEntity: Invoice) {
    return InvoiceModel.fromPrimitives({ ...invoiceEntity });
  }
}
