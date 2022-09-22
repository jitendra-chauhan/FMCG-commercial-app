export interface category {
  _id?: string;
  catName: string;
  msg?: string;
}
export interface brand {
  _id?: string;
  newBrand: string;
  msg?: string;
}
export interface product {
  _id?: string;
  catId: string;
  brandId: string;
  name: string;
  price: number;
  item: number;
  msg?: string;
}

export interface order {
  userId:string;
  catId:string;
  brandId:string;
  productId:string;
  status:string;
  price:number;
  item:number;
}
