import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusDto } from './create-status.dto';

export class UpdateStatusDto  {
		name: string;
	
		position: number;
	}
