import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Tenant')
class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column('jsonb', { nullable: true, default: {} })
  settings: string;

  @Column('jsonb', { nullable: true, default: {} })
  activeKeyPair: string;

  @Column('jsonb', { nullable: true, default: {} })
  rotatedKeyPair: string;

  @Column('jsonb', { nullable: true, default: {} })
  expiredKeyPairs: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Tenant;
