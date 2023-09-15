import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [UserModule, PrismaModule, ProductModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
