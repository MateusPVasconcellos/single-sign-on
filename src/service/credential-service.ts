import { CredentialRepository } from '../repository/credential-repository';
import { CredentialType } from '../enum/credential-type';
import { CryptHelper } from '../helper/crypt-helper';
import Credential from '../infra/entities/Credential';
import { SignUpDto } from '../dto/signup-dto';

const SALT_ROUNDS = Number(process.env.AUTH_SALT_ROUNDS);

class CrendentialService {
  async createBasic(account: SignUpDto) {
    const encryptedPassword = await CryptHelper.encrypt(
      account.password,
      SALT_ROUNDS,
    );
    const createdBasic = new Credential();
    createdBasic.username = account.username;
    createdBasic.password = encryptedPassword;
    createdBasic.credentialType = CredentialType.BASIC;
    await CredentialRepository.save(createdBasic);

    return createdBasic;
  }
}

export const credentialService = new CrendentialService();
