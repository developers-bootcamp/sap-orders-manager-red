import { useEffect, useState } from "react";
import { getAllUser } from "../../axios/userAxios";
import IUser from "../../interfaces/IUser";
import GlobalTable from "../../components/GlobalTable";

const UserTable = () => {
    const [allUser, setAllUser] = useState<IUser[]>([])
    const [allAdministrator, setAllAdministrator] = useState<IUser[]>([])
    const [allEmployee, setAllEmployee] = useState<IUser[]>([])
    const [allCustomer, setAllCustomer] = useState<IUser[]>([])
    
    const getAllUserAsync = async (pageNumber: number) => {
        debugger
        await getAllUser(pageNumber).then(res =>{ setAllUser(res.data);console.log(res.data)});
        allUser?.forEach(element => {
            if (element.roleId.name === "ADMIN"){
                let x=allAdministrator;
                x.push(element);
                setAllAdministrator(x)}
            else
             if (element.roleId.name === "EMPLOYEE")
                setAllEmployee([...allEmployee, element])
            else
                setAllCustomer([...allCustomer, element])
        });
    }

    useEffect(() => {
        getAllUserAsync(0);
        
    }, []);

    const head = ["Full Name", "Password", "Email", "Address", "Phone"]

    return (
        <>
            {allUser != null ? <GlobalTable head={head} rows={allAdministrator} whatToAdd="Administrator"></GlobalTable> : ""}
            <br></br>
            {allUser != null ? <GlobalTable head={head} rows={allEmployee} whatToAdd="Employee"></GlobalTable> : ""}
            <br></br>
            {allUser != null ? <GlobalTable head={head} rows={allCustomer} whatToAdd="Customer"></GlobalTable> : ""}
        </>
    )
}
export default UserTable;