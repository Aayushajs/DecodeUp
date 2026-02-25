import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResponse } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async findAll(): Promise<ProductResponse[]> {
    return this.productsService.findAll();
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponse> {
    return this.productsService.create(createProductDto);
  }
}
