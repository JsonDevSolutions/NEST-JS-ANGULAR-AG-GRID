import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiResponse } from 'src/api/api';
import { CartDto } from './cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async cartItems() {
    return this.cartService.getCartList();
  }

  @Post()
  async create(@Body() dto: CartDto): Promise<ApiResponse<Response>> {
    const cart = await this.cartService.isCartExist(dto.userId, dto.productId);
    if (cart) {
      return this.cartService.updateCart(cart, dto.quantity);
    }
    return this.cartService.create(dto);
  }

  @Delete(':id')
  async deleteCartItem(
    @Param('id') id: string,
  ): Promise<ApiResponse<Response>> {
    return this.cartService.deleteCartItem(Number(id));
  }
}
