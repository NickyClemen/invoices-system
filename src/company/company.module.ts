import { Module } from '@nestjs/common';

import { CompanyFinderService } from './application/usecases/CompanyFinder.service';
@Module({
  providers: [CompanyFinderService],
  exports: [CompanyFinderService],
})
export class CompanyModule {}
