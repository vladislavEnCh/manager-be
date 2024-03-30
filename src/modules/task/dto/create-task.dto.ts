export class CreateTaskDto {
  workspaceId: number;

  columnId: number;
}

export enum PriorityType {
  HIGHT = 'hight',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum ITypes {
  BUG = 'bug',
  TASK = 'task',
  NEW_FEATURE = 'newFeature',
  RE_CHECK = 'reCheck',
  TEST = 'test',
}
