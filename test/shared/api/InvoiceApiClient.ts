import * as request from 'supertest';

import { ApiClient } from './ApiClient';
import { TestClient } from './TestClient';
import { CreateInvoiceDto } from '../../../src/invoice/infraestructure/dto/CreateInvoice.dto';

export class InvoiceApiClient extends ApiClient {
  constructor(client: TestClient) {
    super(client);
  }

  async createInvoice(
    companyUuid = '',
    invoice: CreateInvoiceDto = {} as CreateInvoiceDto,
  ): Promise<request.Response> {
    return this.superTestRequest
      .post(`/invoices/new-invoice/${companyUuid}`)
      .send(invoice);
  }

  async listAllInvoicesByCompany(company_uuid = ''): Promise<request.Response> {
    return this.superTestRequest.get(`/invoices/list-invoices/${company_uuid}`);
  }

  async createAccountStatement(company_uuid = ''): Promise<request.Response> {
    return this.superTestRequest.get(
      `/invoices/new-account-statement/${company_uuid}`,
    );
  }
}
