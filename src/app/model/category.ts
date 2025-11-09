// export interface Category {
//     id: number;
//     name: string;
//     description?: string;
//     createdAt?: Date;
//     updatedAt?: Date;
// }

export interface Category {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  quantity?: number;
}