// export interface Product {
//   id?: number;        // Optional: in case you use IDs from a database
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
//   createdAt?: Date;   // Optional: useful if you plan to store timestamps
//   updatedAt?: Date;   // Optional: for tracking updates
// }
export interface Product {
  stock: number;
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId?: number;
  categoryName?: string;
  images?: string[];

}
