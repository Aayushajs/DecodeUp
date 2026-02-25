import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from './entities/product.entity';
import { API_MESSAGES } from '../common/constants';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<Product[]> {
        return this.prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
            },
        });
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return this.prisma.product.create({
            data: {
                name: createProductDto.name,
                price: createProductDto.price,
                image: createProductDto.image,
            },
        });
    }

    async remove(id: number): Promise<Product> {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            throw new NotFoundException(API_MESSAGES.PRODUCT_NOT_FOUND(id));
        }

        await this.prisma.product.delete({
            where: { id },
        });

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        };
    }
}
