export interface Purchase {
    id: number;
    productId: number; // foreign key to Product
    quantity: number;
    purchasePrice: number;
    supplier?: string;
    purchaseDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
