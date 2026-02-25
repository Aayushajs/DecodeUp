import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductResponse } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<ProductResponse[]> {
    const products = await this.productRepository.find({
      order: { id: 'ASC' },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
    }));
  }

  async create(createProductDto: CreateProductDto): Promise<ProductResponse> {
    const product = this.productRepository.create({
      name: createProductDto.name,
      price: createProductDto.price,
      image: createProductDto.image,
    });
    const savedProduct = await this.productRepository.save(product);
    return {
      id: savedProduct.id,
      name: savedProduct.name,
      price: Number(savedProduct.price),
      image: savedProduct.image,
    };
  }

  async findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }
}
