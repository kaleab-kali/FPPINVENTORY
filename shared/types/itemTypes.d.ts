// interface Category {
//   categoryId?: string;
//   name?: string;
// }

export interface ItemInfo {
  [x: string]: any;
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  categoryId?: string;
}
