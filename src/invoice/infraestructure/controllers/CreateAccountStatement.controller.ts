import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { CreateAccountStatementService } from '../../application/usecases/CreateAccountStatement.service';
import { UuidDTO } from '../../../../shared/infraestructure/dto/Uuid.dto';
import { StatusResponse } from '../../../../shared/infraestructure/api/StatusResponse.interface';
import { AccountStatement, AccountStatementPrimitives } from '../../domain/models/AccountStatement.model';
import { AccountStatementNotCreatedException } from '../../domain/exceptions/AccountStatementNotCreated.exception';
import { AccountStatementDto } from '../dto/AccountStatement.dto';

@Controller('invoices')
export class CreateAccountStatementController {
  constructor(
    @Inject(CreateAccountStatementService)
    private createAccountStatementService: CreateAccountStatementService,
  ) {}

  @Get('new-account-statement/:company_uuid')
  async execute(
    @Param() { company_uuid }: UuidDTO,
    @Res() res: StatusResponse<HttpStatus.OK>,
  ): Promise<
    StatusResponse<AccountStatementDto | AccountStatementNotCreatedException>
  > {
    const accountStatement:
      | AccountStatementPrimitives
      | AccountStatementNotCreatedException =
      await this.createAccountStatementService.execute(company_uuid);

    if (accountStatement instanceof AccountStatementNotCreatedException) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: accountStatement.getErrorMessage() });
    }

    return res.status(HttpStatus.CREATED).json(accountStatement);
  }
}
