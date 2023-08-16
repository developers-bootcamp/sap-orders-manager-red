import IAuditData from "./IAuditData";
import ICompany from "./ICompany";
import IOrderItem from "./IOrderItem";
import IUser from "./IUser";

export default interface IOrder {
    id?: string,
    employeeId?: IUser,
    customerId?: IUser,
    totalAmount?: number,
    orderItemsList?: Array<IOrderItem>,
    orderStatus?: string,
    companyId?: ICompany,
    creditCardNumber?: number,
    expireOn?: Date,
    cvc?: number,
    notificationFlag?: boolean,
    auditData?: IAuditData,
}