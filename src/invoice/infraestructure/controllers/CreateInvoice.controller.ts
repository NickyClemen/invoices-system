import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { UuidDTO } from '../../../../shared/infraestructure/dto/Uuid.dto';
import { CreateInvoiceDto } from '../dto/CreateInvoice.dto';
import { StatusResponse } from '../../../../shared/infraestructure/api/StatusResponse.interface';
import {
  CreateInvoiceService,
  CreateInvoiceServiceResponse,
} from '../../application/usecases/CreateInvoice.service';
import { CompanyNotFoundException } from '../../../company/domain/exceptions/CompanyNotFound.exception';
import { InvoiceCannotCreateException } from '../../domain/exceptions/InvoiceCannotCreate.exception';
import { InvoicePrimitives } from '../../domain/models/Invoice.model';

@Controller('invoices')
export class CreateInvoiceController {
  constructor(
    @Inject(CreateInvoiceService)
    private createInvoiceService: CreateInvoiceService,
  ) {}

  @Post('new-invoice/:company_uuid')
  async execute(
    @Param() { company_uuid }: UuidDTO,
    @Body() invoice: CreateInvoiceDto,
    @Res() res: StatusResponse<HttpStatus.OK>,
  ): Promise<StatusResponse<InvoicePrimitives>> {
    const newInvoice: CreateInvoiceServiceResponse =
      await this.createInvoiceService.execute({
        ...invoice,
        companyUuid: company_uuid,
      });

    if (
      newInvoice instanceof CompanyNotFoundException ||
      newInvoice instanceof InvoiceCannotCreateException
    ) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: newInvoice.getErrorMessage() });
    }

    return res.status(HttpStatus.CREATED).json(newInvoice);
  }
}
