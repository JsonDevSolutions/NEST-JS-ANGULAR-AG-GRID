import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductDto } from './dto';
import { ProductService } from './product.service';
import { ApiResponse } from 'src/api/api';
import { Product } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  // Used for generating fake product
  createRandomProduct(): ProductDto {
    return {
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      published: faker.datatype.boolean(),
    };
  }

  @Get()
  showAll(): Promise<Product[]> {
    return this.productService.showProducts();
  }

  @Post()
  create(@Body() dto: ProductDto): Promise<ApiResponse<Response>> {
    return this.productService.createProduct(dto);
  }

  @Get(':id')
  showProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.showProductById(Number(id));
  }

  @Put(':id')
  updateProduct(
    @Body() product: Product,
    @Param('id') id: number,
  ): Promise<ApiResponse<Response>> {
    return this.productService.updateProduct(Number(id), product);
  }

  @Put('status/:id')
  updateStatus(
    @Body('published') published: boolean,
    @Param('id') id: number,
  ): Promise<ApiResponse<Response>> {
    return this.productService.updateProductStatus(Number(id), published);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<ApiResponse<Response>> {
    return this.productService.deleteProductById(Number(id));
  }
}
