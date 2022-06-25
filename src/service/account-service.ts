import { BusinessException } from 'src/execption/business-exception';
import { throwIf } from 'src/helper/throw-if';
import { accountRepository } from 'src/repository/account-repository';

interface account {
  email: string;
}

class AccountService {
  async signup(account: account) {
    const existingAccount = await accountRepository.findByEmail(account.email);
    throwIf(
      new BusinessException('E-mail already exists.', HttpStatus.CONFLICT),
      existingAccount,
    );
  }
}
