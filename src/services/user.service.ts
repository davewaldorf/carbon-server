// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { TreeService } from './tree.service';
import { Purchase, Purchases } from 'src/types/purchases';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private treeService: TreeService,
  ) {}

  async calculateTotalCO2Offset(
    treePurchases: Purchases,
    sessionId: string,
  ): Promise<User> {
    const treeData = this.treeService.getTreeData();

    // Initialize an object to store emissions data
    const emissionsData = {};

    // Logic to calculate CO2 emissions for a tree in a given month
    const calculateTreeEmissions = (purchase: Purchase) => {
      const purchaseDate = new Date(purchase.month);
      const currentMonth = new Date();
      const treeAgeInMonths =
        (currentMonth.getFullYear() - purchaseDate.getFullYear()) * 12 +
        (currentMonth.getMonth() - purchaseDate.getMonth());
      const isFullyGrown = treeAgeInMonths >= treeData.fullyGrownYear * 12;

      let co2Offset = 0;
      if (treeAgeInMonths >= 1) {
        co2Offset = isFullyGrown
          ? treeData.fullyGrownYear * treeData.co2OffsetPerYear
          : treeAgeInMonths * (treeData.co2OffsetPerYear / 12);
      }

      return co2Offset * purchase.trees;
    };

    const earliestPurchaseDate = new Date(
      Math.min(
        ...treePurchases.map((purchase) => new Date(purchase.month).getTime()),
      ),
    );

    // Calculate the end date (20 years after the earliest purchase date)
    const endDate = new Date(earliestPurchaseDate);
    endDate.setFullYear(earliestPurchaseDate.getFullYear() + 20);

    // Iterate through tree purchases
    for (const purchase of treePurchases) {
      if (purchase.trees <= 0) {
        continue;
      }

      // Iterate through months within the 20-year range
      for (
        let currentMonth = new Date(earliestPurchaseDate);
        currentMonth <= endDate;
        currentMonth.setMonth(currentMonth.getMonth() + 1)
      ) {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        if (!emissionsData[year]) {
          emissionsData[year] = {};
        }

        if (!emissionsData[year][month]) {
          emissionsData[year][month] = 0;
        }

        emissionsData[year][month] += calculateTreeEmissions(purchase);
      }
    }

    // Find the user and update their CO2 offset data
    const user = await this.userRepository.findOne({
      where: { userID: sessionId },
    });
    if (!user) {
      throw new Error(`User with session ID ${sessionId} not found`);
    }

    user.treeEmissions = emissionsData;
    return await this.userRepository.save(user);
  }
}
