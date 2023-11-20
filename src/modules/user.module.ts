import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { TreeService } from '../services/tree.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, TreeService],
  controllers: [UserController],
})
export class UserModule {}
