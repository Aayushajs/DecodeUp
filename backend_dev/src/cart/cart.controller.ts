import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartResponse } from './dto/cart-response.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(): Promise<CartResponse> {
    return this.cartService.getCart();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addToCart(@Body() addToCartDto: AddToCartDto): Promise<CartResponse> {
    return this.cartService.addToCart(addToCartDto);
  }

  @Delete(':id')
  async removeFromCart(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CartResponse> {
    return this.cartService.removeFromCart(id);
  }
}
