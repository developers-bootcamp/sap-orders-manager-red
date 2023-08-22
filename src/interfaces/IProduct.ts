
import IProductCategory from "./IProductCategory";

export default interface IProduct {
    id?: string,
    name: string,
    desc: string,
    inventory: number,
    discount: number,
    discountType: string,
    productCategoryId: IProductCategory,
    price: number,
}