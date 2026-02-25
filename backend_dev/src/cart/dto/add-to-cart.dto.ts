import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
