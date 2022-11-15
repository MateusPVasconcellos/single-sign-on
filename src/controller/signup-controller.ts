import { Request, Response } from 'express';
import { accountService } from '../service/account-service';
import HttpStatus from 'http-status-codes';
import { SignUpDto } from '../dto/signup-dto';
import { validate } from 'class-validator';
import { BusinessException } from '../execption/business-exception';

class SignupController {
  public async signup(request: Request, response: Response) {
    const { body: account } = request;
    const dto = new SignUpDto();
    dto.username = account.email;
    dto.password = account.password;
    dto.passwordConfirmation = account.passwordConfirmation;
    await validate(dto, { validationError: { target: false } }).then(err => {
      throw new BusinessException(
        `validation not successful` + err,
        HttpStatus.FORBIDDEN,
      );
    });
    await accountService.signup(dto);
    response.status(HttpStatus.CREATED).send();
  }
}

export const signupController = new SignupController();
