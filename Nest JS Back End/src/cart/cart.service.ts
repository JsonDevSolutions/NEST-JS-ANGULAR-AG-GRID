import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/api/api';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartDto } from './cart.dto';
import { Cart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async create(data: CartDto): Promise<ApiResponse<Response>> {
    try {
      await this.prisma.cart.create({ data });
      return { message: 'Product added to cart successfully.' };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async isCartExist(userId: number, productId: number): Promise<Cart> {
    return await this.prisma.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });
  }

  async updateCart(
    cart: Cart,
    quantity: number,
  ): Promise<ApiResponse<Response>> {
    const addCart = await this.prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        quantity: cart.quantity + quantity,
      },
    });

    if (addCart) {
      return { message: 'Cart Updated Successfully.' };
    }
    return { message: 'Something went wrong.' };
  }

  async getCartList(userId: number) {
    return await this.prisma.cart.findMany({
      where: {
        userId,
      },
      include: { product: true },
    });
  }

  async getCartItemsCount(userId: number) {
    return await this.prisma.cart.count({
      where: {
        userId,
      },
    });
  }

  async deleteCartItem(
    userId: number,
    productId: number,
  ): Promise<ApiResponse<Response>> {
    try {
      const deleteCart = await this.prisma.cart.deleteMany({
        where: { productId, userId },
      });

      if (deleteCart) {
        return {
          message: 'Cart item deleted successfully',
          statusCode: HttpStatus.OK,
        };
      }
    } catch (error) {
      return { message: 'Something went wrong.' };
    }
  }
}
