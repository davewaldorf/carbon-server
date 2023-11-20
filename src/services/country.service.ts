// src/country/country.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async getCountryCO2Consumption(countryName: string): Promise<any> {
    const countryData = await this.countryRepository.findOne({
      where: { name: countryName },
    });

    if (!countryData) {
      throw new Error('Country not found');
    }

    return {
      country: countryData.name,
      co2Consumption: countryData.co2Consumption * 1000,
    };
  }

  async getCountryNames(): Promise<string[]> {
    const countries = await this.countryRepository.find();
    return countries.map((country) => country.name);
  }
}
