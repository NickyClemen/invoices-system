import {
  Controller,
  HttpStatus,
  Inject,
  Param,
  Get,
  Res,
} from '@nestjs/common';

import { UuidDTO } from '../../../../shared/infraestructure/dto/Uuid.dto';
import { StatusResponse } from '../../../../shared/infraestructure/api/StatusResponse.interface';

import { InvoicePrimitives } from '../../domain/models/Invoice.model';
import { InvoiceShowerService } from '../../application/usecases/InvoiceShower.service';
import { InvoicesByCompanyUuidNotFoundException } from '../../domain/exceptions/InvoicesByCompanyUuidNotFound.exception';

@Controller('invoices')
export class ListInvoicesNotExpiredController {
  constructor(
    @Inject(InvoiceShowerService)
    private invoiceShowerService: InvoiceShowerService,
  ) {}

  @Get('list-invoices/:company_uuid')
  async execute(
    @Param() { company_uuid }: UuidDTO,
    @Res() res: StatusResponse<HttpStatus.OK>,
  ): Promise<StatusResponse<InvoicePrimitives[]>> {
    const invoices:
      | InvoicePrimitives[]
      | InvoicesByCompanyUuidNotFoundException =
      await this.invoiceShowerService.execute(company_uuid);

    if (invoices instanceof InvoicesByCompanyUuidNotFoundException) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: invoices.getErrorMessage() });
    }

    return res.status(HttpStatus.OK).json(invoices);
  }
}
