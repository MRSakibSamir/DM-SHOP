export interface Product {
  id?: number;           // backend auto-generate করবে
  name: string;
  category: string;
  price: number;
  stock: number;
  editing?: boolean;     // UI editing flag
  purchaseQty?: number;  // Temporary purchase input
  saleQty?: number;      // Temporary sale input
}