export interface Sale {
    id: number;
    productId: number;  // foreign key to Product
    customerId: number; // foreign key to Customer
    quantity: number;
    totalPrice: number;
    saleDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
