import IAuditData from "./IAuditData";
import ICompany from "./ICompany";
import IOrderItem from "./IOrderItem";
import IUser from "./IUser";

export default interface IOrder {
    id?: string,
    employeeId?: {id: string},
    customerId?: {id: string},
    totalAmount?: number,
    orderItemsList?: Array<IOrderItem>,
    orderStatusId?: string,
    companyId?: {id: string},
    creditCardNumber?: number,
    expiryOn?: Date,
    cvc?: number,
    notificationFlag?: number,
    auditData?: IAuditData,
}