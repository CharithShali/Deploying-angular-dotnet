export interface Category {
  categoryId: number;
  category: string;
  description: string;
}
export interface Products {
  productId: number;
  title: string;

  description: string;

  categoryId: number;

  price: number;

  quantity: number;

  imageName: string;

  userId: number;
}
export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobile: number;
  password: string;
  createdAt: string;
  role: string;
  token: string;
}

export interface Cart {
  CartId: number;
  UserId: number;
  Ordered: string;
  OrderedOn: string;
}

export interface CartItem {
  CartItemId: number;
  CartId: number;
  ProductId: number;
  Quantity: number;
}

export interface cart {
  productimage: string;
  productname: string;
  cartquantity: number;
  productprice: number;
  amount: number;
  userid: number;
  cartitemid: number;
}
export interface order {
  id: number;
  userId: number;
  agentEmail: string;
  status: string;
  amount: number;
}

export interface EditOrder {
  orderid: number;
  agentEmail: string;
  status: boolean;
}
