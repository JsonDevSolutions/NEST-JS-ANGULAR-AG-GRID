import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiResponse } from 'src/api/api';
import { CartDto } from './cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  async cartItems(@Param('userId') userId: string) {
    return this.cartService.getCartList(Number(userId));
  }

  @Get('count/:userId')
  async cartItemsCount(@Param('userId') userId: string) {
    return await this.cartService.getCartItemsCount(Number(userId));
  }

  @Post()
  async create(@Body() dto: CartDto): Promise<ApiResponse<Response>> {
    const cart = await this.cartService.isCartExist(dto.userId, dto.productId);
    if (cart) {
      return this.cartService.updateCart(cart, dto.quantity);
    }
    return this.cartService.create(dto);
  }

  @Delete(':userId/:id')
  async deleteCartItem(
    @Param('userId') userId: string,
    @Param('id') id: string,
  ): Promise<ApiResponse<Response>> {
    return this.cartService.deleteCartItem(Number(userId), Number(id));
  }
}
