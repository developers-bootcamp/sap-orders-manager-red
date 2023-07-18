import IAuditData from "./IAuditData";
import ICompany from "./ICompany";

export default interface IProductCategory {
    id: string,
    name: string,
    desc: string,
    companyId: ICompany,
    auditData: IAuditData,
}