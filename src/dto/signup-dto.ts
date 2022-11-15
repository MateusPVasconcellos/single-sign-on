import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { IsEqualTo } from '../helper/is-equal-to-helper';

export class SignUpDto {
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsEqualTo('password')
  passwordConfirmation: string;
}
