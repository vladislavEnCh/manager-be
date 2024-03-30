import { MinLength } from 'class-validator';

export class CreateColumnDto {
  @MinLength(2, { message: 'Name too short' })
  name: string;

  workspace_id: number;
}
