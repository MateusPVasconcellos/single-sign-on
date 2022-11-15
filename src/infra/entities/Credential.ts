import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Account from './Account';
import Tenant from './Tenant';

@Entity('Credential')
class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  credentialType: string;

  @OneToOne(() => Tenant)
  @JoinColumn()
  tenant: Tenant;

  @ManyToOne(() => Account, account => account.credentials)
  account: Account;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Credential;
