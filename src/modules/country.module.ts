import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../entities/country.entity';
import { CountryController } from '../controllers/country.controller';
import { CountryService } from '../services/country.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
