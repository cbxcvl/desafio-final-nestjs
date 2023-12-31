import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'O campo de e-mail é obrigatório' })
  @IsEmail({}, { message: 'O campo email precisa ter um formato válido' })
  @Length(1, 255, {
    message: 'O campo email pode ter no máximo 255 caracteres',
  })
  email: string;

  @IsNotEmpty({ message: 'O campo de senha é obrigatório' })
  @Length(8, 255, { message: 'A senha precisa ter entre 8 e 255 caracteres' })
  password: string;
}
