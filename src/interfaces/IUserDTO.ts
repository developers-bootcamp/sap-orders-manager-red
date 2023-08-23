export default interface IUserDTO {
    id?: string,
    password:string,
    fullName: string,
    email: string, 
    address: string,
    phone: string,
    roleId?: string
}