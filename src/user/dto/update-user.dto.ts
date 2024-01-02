import { IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(4, 255, {
    message: 'O campo nome precisa ter entre 4 e 255 caracteres',
  })
  name?: string;

  @IsEmail({}, { message: 'O campo email precisa ter um formato válido' })
  @Length(1, 255, {
    message: 'O campo email pode ter no máximo 255 caracteres',
  })
  email?: string;

  @Length(8, 255, {
    message: 'A senha precisa ter entre 8 e 255 caracteres',
  })
  password?: string;

  phone?: number;

  cpf?: number;
}
