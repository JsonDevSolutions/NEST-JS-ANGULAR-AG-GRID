import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { ApiResponse } from 'src/api/api';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(
    data: Prisma.ProductCreateInput,
  ): Promise<ApiResponse<Response>> {
    try {
      await this.prisma.product.create({ data });
      return { message: 'Product added succesfully.', success: true };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async showProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({ orderBy: { id: 'desc' } });
  }

  async showProductById(id: number): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async updateProductStatus(
    id: number,
    published: boolean,
  ): Promise<ApiResponse<Response>> {
    const user = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        published,
      },
    });

    if (user) {
      return { message: 'Updated Successfully.' };
    }
    return { message: 'Something went wrong.' };
  }

  async updateProduct(
    id: number,
    product: Product,
  ): Promise<ApiResponse<Response>> {
    const user = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...product,
      },
    });

    if (user) {
      return { message: 'Updated Successfully.' };
    }
    return { message: 'Something went wrong.' };
  }

  async deleteProductById(id: number): Promise<ApiResponse<Response>> {
    const user = await this.prisma.product.delete({
      where: {
        id,
      },
    });
    if (user) {
      return { message: 'Deleted Successfully.' };
    }
    return { message: 'Something went wrong.' };
  }
}
