import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column('jsonb', { nullable: true })
  carbonNeutrality: any[];

  @Column('jsonb', { nullable: true })
  purchases: any[];

  @Column('jsonb', { nullable: true })
  treeEmissions: { [key: string]: any };
}
