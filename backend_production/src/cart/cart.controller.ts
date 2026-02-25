import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartResponseDto } from './dto/cart-response.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getCart(): Promise<CartResponseDto> {
        return this.cartService.getCart();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addToCart(@Body() addToCartDto: AddToCartDto): Promise<CartResponseDto> {
        return this.cartService.addToCart(addToCartDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async removeFromCart(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<CartResponseDto> {
        return this.cartService.removeFromCart(id);
    }
}
