import { Injectable } from '@nestjs/common';

@Injectable()
export class TreeService {
  private treeData = {
    initialCost: 120,
    annualCostPercentage: 10,
    co2OffsetPerYear: 5.7,
    fullyGrownYear: 6,
  };

  getTreeData() {
    return this.treeData;
  }
}
