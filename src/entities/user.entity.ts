import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Purchases } from 'src/types/purchases.type';
import { CarbonNeutrality } from 'src/types/carbonneutrality.type';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column('jsonb', { nullable: true })
  carbonNeutrality: CarbonNeutrality;

  @Column('jsonb', { nullable: true })
  purchases: Purchases;

  @Column('jsonb', { nullable: true })
  treeEmissions: { [key: string]: any };
}
