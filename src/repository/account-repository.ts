import Account from '../infra/entities/Account';
import { AppDataSource } from '../../data-source';

export const AccountRepository = AppDataSource.getRepository(Account).extend({
  //here you can implement your own methods
  findByEmail(email: string): Promise<Account[]> {
    const accountByEmail = this.find({
      where: {
        email: email,
      },
    });
    return accountByEmail;
  },
});
