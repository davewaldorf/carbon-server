// src/country/country.controller.ts

import { CountryService } from '../services/country.service';
import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Controller('countries')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get('/:country/co2-consumption')
  async getCO2Consumption(@Param('country') country: string) {
    try {
      const data = await this.countryService.getCountryCO2Consumption(country);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/names')
  async getCountryNames() {
    try {
      return await this.countryService.getCountryNames();
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
