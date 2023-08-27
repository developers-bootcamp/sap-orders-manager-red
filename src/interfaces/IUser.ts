import IAddress from "./IAddress";
import IAuditData from "./IAuditData";
import ICompany from "./ICompany";
import IRole from "./IRole";
export default interface IUser {
    id: String,
    fullName?: String,
    password?: String,
    address?: IAddress,
    roleId?: IRole,
    companyId?: ICompany,
    auditData?: IAuditData,
}


