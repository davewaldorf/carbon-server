import { NestFactory } from '@nestjs/core';
import { Country } from './entities/country.entity'; // Update the path as per your project structure
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';

const countries = [
  'United States',
  'United Kingdom',
  'Germany',
  'South Africa',
  'India',
  'China',
  'Singapore',
  'Australia',
];

async function seedCountries() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const countryRepository = app.get(getRepositoryToken(Country));

  for (const countryName of countries) {
    const country = new Country();
    country.name = countryName;
    // Set other properties if needed
    await countryRepository.save(country);
  }

  console.log('Countries have been seeded');
  await app.close();
}

seedCountries().catch((err) => {
  console.error('Seeding failed:', err);
});
