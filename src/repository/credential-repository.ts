import Credential from '../infra/entities/Credential';
import { AppDataSource } from '../../data-source';

export const CredentialRepository = AppDataSource.getRepository(
  Credential,
).extend({
  // here you can implement your own methods
});
