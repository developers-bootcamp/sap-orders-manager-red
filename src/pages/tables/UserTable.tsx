import { useEffect, useState } from "react";
import { addUser, deleteUser, editUser, getAllUser } from "../../axios/userAxios";
import IUser from "../../interfaces/IUser";
import GlobalTable from "../../components/GlobalTable";
import Button from "@mui/material/Button";
import {PALLETE} from "../../config/config"
import ArrowCircleUpSharp from '@mui/icons-material/ArrowCircleUpSharp';
import IAddress from "../../interfaces/IAddress";
import { Email } from "@mui/icons-material";
import IUserDTO from "../../interfaces/IUserDTO";


const UserTable = () => {
    const [allUser, setAllUser] = useState<IUserDTO[]>();
    const [isOpenAdmin, setIsOpenAdmin] = useState(true);
    const [isOpenEmp, setIsOpenEmp] = useState(true);
    const [isOpenCustomer, setIsOpenCustomer] = useState(true);

    const getAllUserAsync = async (pageNumber: number) => {
        await getAllUser(pageNumber).then(res =>{ setAllUser(res.data);console.log(res.data)});
    }


    useEffect(() => {
        getAllUserAsync(0);        
    },[]);

    const goToEditUser = async (id: string, user: {FullName: string,Password: string, Phone:string,Email:string,Address:string,RoleId:string }) => {
        const editUser1: IUserDTO = {
            fullName:user.FullName,
            password:user.Password,
            phone:user.Phone,
            address:user.Address,
            email:user.Email,
            roleId:user.RoleId
        }
        editUser(id, editUser1)
    }


    const goToAddAdmin = async (user: { FullName: string, Password: string,Phone:string,Email:string,Address:string }) => {
        const addUser1: IUserDTO = {
            fullName:user.FullName,
            password:user.Password,
            phone:user.Phone,
            address:user.Address,
            email:user.Email,
            roleId:"1"
            
        }
        console.log(addUser1)
        await addUser(addUser1)
    }
  

    const goToAddEmp = async (user: { FullName: string, Password: string,Phone:string,Email:string,Address:string }) => {
        const addUser2: IUserDTO = {
            fullName:user.FullName,
            password:user.Password,
            phone:user.Phone,
            address:user.Address,
            email:user.Email,
            roleId:"2"
            
        }
        console.log(addUser2)
        await addUser(addUser2)
    }
    const goToAddCust = async (user: { FullName: string, Password: string,Phone:string,Email:string,Address:string }) => {
        const addUser3: IUserDTO = {
            fullName:user.FullName,
            password:user.Password,
            phone:user.Phone,
            address:user.Address,
            email:user.Email,
            roleId:"3"
            
        }
        console.log(addUser3)
        await addUser(addUser3)
    }
    const head =
    [{ name: "FullName", type: "text" },
     { name: "Password", type: "text" },
     { name: "Email", type: "text" },
     { name: "Address", type: "text" },
     { name: "Phone", type: "number" },
    //  { name: "RoleId", type: "number" }

    ]

    return (<>

<Button sx={{ color: PALLETE.RED }} startIcon={<ArrowCircleUpSharp />} onClick={() => setIsOpenAdmin(!isOpenAdmin)}>{isOpenAdmin ? 'Administrators' : 'Administrators'}
              </Button>
              <br></br>
              {isOpenAdmin && 
              
<div>
            {allUser != null ? <GlobalTable head={head} rows={allUser.filter(user=>user.roleId === "1")
        .map(user=>({
            id: user.id,
            FullName:user.fullName,
            Password:user.password,
            Email:user.email,
            Address:user.address,
            Phone:user.phone

        }))
        
        
        } whatToAdd="Administrator" delete={deleteUser} add={goToAddAdmin} edit={goToEditUser}></GlobalTable> : ""}
        </div>    }
            <br></br>
            <Button sx={{ color: PALLETE.YELLOW }} startIcon={<ArrowCircleUpSharp />} onClick={() => setIsOpenEmp(!isOpenEmp)}>{isOpenEmp ? 'Employees' : 'Employees'}
              </Button>
              <br></br>
              {isOpenEmp && 
              
<div>            {allUser != null ? <GlobalTable head={head} rows={allUser.filter(user=>user.roleId === "2")
.map(user=>({
    id: user.id,
    FullName:user.fullName,
    Password:user.password,
    Email:user.email,
    Address:user.address,
    Phone:user.phone

}))
} whatToAdd="Employee" delete={deleteUser} add={goToAddEmp} edit={goToEditUser}></GlobalTable> : ""}

        </div>    }
            <br></br>
            <Button sx={{ color: PALLETE.BLUE }}  startIcon={<ArrowCircleUpSharp />} onClick={() => setIsOpenCustomer(!isOpenCustomer)}>{isOpenCustomer ? 'Customers' : 'Customers'}
              </Button>
              <br></br>
              {isOpenCustomer && 
              
<div>            
{allUser != null ? <GlobalTable head={head} rows={allUser.filter(user=>user.roleId === "3")
.map(user=>({
    id: user.id,
    FullName:user.fullName,
    Password:user.password,
    Email:user.email,
    Address:user.address,
    Phone:user.phone

}))
} whatToAdd="Customer" delete={deleteUser} add={goToAddCust} edit={goToEditUser}></GlobalTable> : ""}

        </div>    }
        </>
    )
}
export default UserTable;