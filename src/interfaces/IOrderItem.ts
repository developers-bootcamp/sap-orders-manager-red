import IProduct from "./IProduct";

export default interface IOrderItem {
    productId: IProduct,
    amount?: number,
    quantity: number,
}