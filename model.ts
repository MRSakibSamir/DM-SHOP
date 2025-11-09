// sale.model.ts

export interface SaleItem {
  product?: { name: string };  
  price: number;
  qty: number;
  lineTotal?: number;          
}

export interface Sale {
  id: number;
  date: Date;
  customer?: { name: string };
  status: string;
  items: SaleItem[];
}
