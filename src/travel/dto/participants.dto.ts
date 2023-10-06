import { CreateUserDTO } from '../../users/dto/create-user-body';

export class ParticipantsDto {
  confirmed: CreateUserDTO[];
  pendents: CreateUserDTO[];
}
