import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'double precision', nullable: true })
  co2Consumption?: number;
}
