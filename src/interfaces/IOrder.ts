import IAuditData from "./IAuditData";
import ICompany from "./ICompany";
import IOrderItem from "./IOrderItem";
import IUser from "./IUser";

export default interface IOrder {
    id: string,
    employeeId: IUser,
    customerId: IUser,
    totalAmount: number,
    orderItemsList: Array<IOrderItem>,
    orderStatusId: string,
    companyId: ICompany,
    creditCardNumber: number,
    expiryOn: Date,
    cvc: number,
    notificationFlag: number,
    auditData: IAuditData,
}