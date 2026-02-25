import { IsInt, IsPositive, IsOptional, Min } from 'class-validator';

export class AddToCartDto {
    @IsInt({ message: 'productId must be an integer' })
    @IsPositive({ message: 'productId must be a positive number' })
    productId: number;

    @IsOptional()
    @IsInt({ message: 'quantity must be an integer' })
    @Min(1, { message: 'quantity must be at least 1' })
    quantity?: number = 1;
}
