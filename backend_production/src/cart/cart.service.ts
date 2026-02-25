import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartResponseDto } from './dto/cart-response.dto';
import { API_MESSAGES } from '../common/constants';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) { }

    async getCart(): Promise<CartResponseDto> {
        const cartItems = await this.prisma.cartItem.findMany({
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                    },
                },
            },
        });

        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0,
        );

        return {
            items: cartItems,
            totalItems,
            totalPrice: Math.round(totalPrice * 100) / 100,
        };
    }

    async addToCart(addToCartDto: AddToCartDto): Promise<CartResponseDto> {
        const { productId, quantity = 1 } = addToCartDto;

        // Validate that the product exists
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException(API_MESSAGES.PRODUCT_NOT_FOUND(productId));
        }

        if (quantity < 1) {
            throw new BadRequestException(API_MESSAGES.QUANTITY_MIN);
        }

        // Upsert: if item already in cart, increment quantity; otherwise insert
        const existingItem = await this.prisma.cartItem.findUnique({
            where: { productId },
        });

        if (existingItem) {
            await this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        } else {
            await this.prisma.cartItem.create({
                data: {
                    productId,
                    quantity,
                },
            });
        }

        return this.getCart();
    }

    async removeFromCart(id: number): Promise<CartResponseDto> {
        // Validate that the cart item exists
        const cartItem = await this.prisma.cartItem.findUnique({
            where: { id },
        });

        if (!cartItem) {
            throw new NotFoundException(API_MESSAGES.CART_ITEM_NOT_FOUND(id));
        }

        await this.prisma.cartItem.delete({
            where: { id },
        });

        return this.getCart();
    }
}
