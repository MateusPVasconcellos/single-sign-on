import Account from 'src/model/account.js';

class AccountRepository {
  async create(account: object) {
    return await Account.query().insert(account);
  }

  async findByEmail(email: string) {
    return await Account.query().findOne('email', email);
  }

  async findByEmailWithCredentials(email: string) {
    return await Account.query()
      .findOne('email', email)
      .withGraphFetched('credential');
  }

  async activate(id: string) {
    return await Account.query().patch({ active: true }).where('id', id);
  }
}

export const accountRepository = new AccountRepository();
