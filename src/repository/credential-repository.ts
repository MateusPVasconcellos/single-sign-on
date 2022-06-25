import Credential from 'src/model/credential';
import { CredentialType } from '../enum/credential-type';

class CredentialRepository {
  async create(credential: object) {
    return await Credential.query().insert(credential);
  }

  async updatePassword(accountId: string, newPassword: string) {
    return await Credential.query()
      .patch({ password: newPassword })
      .where({ account_id: accountId, credential_type: CredentialType.BASIC });
  }
}

export const accountRepository = new CredentialRepository();
