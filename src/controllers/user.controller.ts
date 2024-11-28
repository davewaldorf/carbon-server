import {
  Controller,
  Post,
  Body,
  Session,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Purchases } from '../types/purchases';
import { UserSession } from '../types/session';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/calculate-co2-offset')
  async calculateCO2Offset(
    @Body() treePurchases: Purchases,
    @Session() session: UserSession,
  ) {
    try {
      if (!Array.isArray(treePurchases) || treePurchases.length === 0) {
        throw new HttpException(
          'Invalid tree purchases data',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Make sure to pass arguments in the correct order
      const user = await this.userService.calculateTotalCO2Offset(
        treePurchases,
        session.userID,
      );

      return user;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
