import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartResponse, CartItemResponse } from './dto/cart-response.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  async getCart(): Promise<CartResponse> {
    const items = await this.cartItemRepository.find({
      relations: ['product'],
      order: { id: 'ASC' },
    });

    const cartItems: CartItemResponse[] = items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: Number(item.product.price),
        image: item.product.image,
      },
    }));

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

  async addToCart(addToCartDto: AddToCartDto): Promise<CartResponse> {
    const { productId, quantity } = addToCartDto;

    // Verify product exists
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new BadRequestException(`Product with ID ${productId} not found`);
    }

    // Check if item already exists in cart
    let cartItem = await this.cartItemRepository.findOne({
      where: { productId },
    });

    if (cartItem) {
      // Update quantity
      const newQty = cartItem.quantity + quantity;
      if (newQty <= 0) {
        // Remove item if quantity drops to zero or below
        await this.cartItemRepository.remove(cartItem);
      } else {
        cartItem.quantity = newQty;
        await this.cartItemRepository.save(cartItem);
      }
    } else {
      if (quantity <= 0) {
        throw new BadRequestException(
          'Quantity must be positive when adding a new item to cart',
        );
      }
      // Insert new cart item
      cartItem = this.cartItemRepository.create({ productId, quantity });
      await this.cartItemRepository.save(cartItem);
    }

    return this.getCart();
  }

  async removeFromCart(id: number): Promise<CartResponse> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }

    await this.cartItemRepository.remove(cartItem);
    return this.getCart();
  }
}
