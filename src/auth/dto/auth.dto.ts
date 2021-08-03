import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class SignUpDTO {
  @IsEmail()
  @MinLength(6)
  @ApiProperty({ type: String, description: 'email' })
  email: string

  @IsString()
  @MinLength(6)
  @ApiProperty({ type: String, description: 'password' })
  password: string

  @IsString()
  @MinLength(6)
  @ApiProperty({ type: String, description: 'name' })
  name: string
}

export class SignInDTO extends OmitType(SignUpDTO, ['name'] as const) {}
