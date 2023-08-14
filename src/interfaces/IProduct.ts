import IAuditData from "./IAuditData";
import ICompany from "./ICompany";
import IProductCategory from "./IProductCategory";

export default interface IProduct {
    id: string,
    name?: string,
    desc?: string,
    inventory?: number,
    discount?: number,
    discountType?: string,
    productCategoryId?: IProductCategory,
    companyId?: ICompany,
    auditData: IAuditData,
    quantity?:number,
    price?: number,
}