import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { TaskModule } from './modules/task/task.module';
import { ColumnModule } from './modules/column/column.module';
import { Workspace } from './modules/workspace/entities/workspace.entity';
import { Task } from './modules/task/entities/task.entity';
import { WorkspaceColumn } from './modules/column/entities/column.entity';
import { ProjectModule } from './modules/project/project.module';
import { Project } from './modules/project/entities/project.entity';
//import { ProjectTaskModule } from './modules/project-task/project-task.module';
import { StatusModule } from './modules/status/status.module';
import { StatusTaskModule } from './modules/status-task/status-task.module';
import { Status } from './modules/status/entities/status.entity';
import { StatusTask } from './modules/status-task/entities/status-task.entity';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORt'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Workspace, Task, WorkspaceColumn, Project, Status, StatusTask],
        synchronize: true,
        //migrations: ['../migration/**'],
      }),

      inject: [ConfigService],
    }),
    AuthModule,
    WorkspaceModule,
    TaskModule,
    ColumnModule,
    ProjectModule,
    //ProjectTaskModule,
    StatusModule,
    StatusTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
