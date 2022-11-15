import { BusinessException } from '../execption/business-exception';
import { throwIf } from '../helper/throw-if';
import { AccountRepository } from '../repository/account-repository';
import HttpStatus from 'http-status-codes';
import Account from '../infra/entities/Account';
import { credentialService } from './credential-service';
import { SignUpDto } from '../dto/signup-dto';
class AccountService {
  async signup(account: SignUpDto): Promise<Account> {
    const existingAccount = await AccountRepository.findByEmail(
      account.username,
    );
    throwIf(
      new BusinessException('E-mail already exists', HttpStatus.CONFLICT),
      existingAccount[0] instanceof Account,
    );
    const createdBasic = await credentialService.createBasic(account);
    const createdAccount = new Account();
    createdAccount.email = account.username;
    createdAccount.credentials = [createdBasic];
    await AccountRepository.save(createdAccount);

    return createdAccount;
  }
}

export const accountService = new AccountService();
