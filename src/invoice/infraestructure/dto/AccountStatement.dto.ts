import { IsArray, IsNumber, IsString } from 'class-validator';
import { InvoicePrimitives } from '../../domain/models/Invoice.model';

export class AccountStatementDto {
  @IsString()
  companyUuid: string;

  @IsArray()
  invoices: InvoicePrimitives[];

  @IsNumber()
  totalAmount: number;
}