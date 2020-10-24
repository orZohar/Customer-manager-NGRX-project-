export interface Customer {
    id: number;
    email:string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    orders?: Order[];
    ordersTotal?: number;
    //latitude?: number;
    //longitude?: number;
}

export interface Order {
    id:number;
    productName: string;
    itemPrice: number;
    //dateOfPurchase: string;
    quantity: number;
    totalPrice: number;
    customerId: number;
}