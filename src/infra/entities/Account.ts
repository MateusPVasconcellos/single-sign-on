import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Tenant from './Tenant';
import Credential from './Credential';

@Entity('Account')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ default: false })
  active: boolean;

  @Column('jsonb', { nullable: true, default: {} })
  attributes: string;

  @OneToOne(() => Tenant, tenant => tenant.id)
  @JoinColumn()
  tenant: Tenant;

  @OneToMany(() => Credential, credential => credential.account, {
    cascade: true,
  })
  credentials: Credential[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Account;
