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

    const goToEditUser = async (id: string, user: { id: string, FullName: string, Password: string,Address: IAddress}) => {
        // const editUser1: IUser = {
        //     id: user.id,
        //     fullName:user.FullName,
        //     password:user.Password
        //     // address:user.Address
        // }
        // editUser(id, editUser1)
    }


    const goToAddUser = async (user: { FullName: string, Password: string,Phone:string,Email:string,Address:string }) => {
        const addUser1: IUserDTO = {
            fullName:user.FullName,
            phone:user.Phone,
            address:user.Address,
            email:user.Email,
            roleId:"1"
            
        }
        await addUser(addUser1)
    }
  

    const head =
    [{ name: "Full Name", type: "text" },
     { name: "Email", type: "text" },
     { name: "Address", type: "text" },
     { name: "Phone", type: "number" }
    ]
    // const head = ["Full Name", "Password", "Email", "Address", "Phone"]

    return (<>
                {/* {allCategory != null ? <GlobalTable head={head} rows={allCategory} whatToAdd="item" delete={deleteCategory} add={goToAddCategory} edit={goToEditCategory}></GlobalTable> : ""} */}


<Button sx={{ color: PALLETE.RED }} startIcon={<ArrowCircleUpSharp />} onClick={() => setIsOpenAdmin(!isOpenAdmin)}>{isOpenAdmin ? 'Administrators' : 'Administrators'}
              </Button>
              <br></br>
              {isOpenAdmin && 
              
<div>
            {allUser != null ? <GlobalTable head={head} rows={allUser.filter(user=>user.roleId === "1")} whatToAdd="Administrator" delete={deleteUser} add={goToAddUser} edit={goToEditUser}></GlobalTable> : ""}
        </div>    }
            <br></br>
            <Button sx={{ color: PALLETE.YELLOW }} startIcon={<ArrowCircleUpSharp />} onClick={() => setIsOpenEmp(!isOpenEmp)}>{isOpenEmp ? 'Employees' : 'Employees'}
              </Button>
              <br></br>
              {isOpenEmp && 
              
<div>            {allUser != null ? <GlobalTable head={head} rows={allUser.filter(user=>user.roleId === "2")} whatToAdd="Employee" delete={deleteUser} add={goToAddUser} edit={goToEditUser}></GlobalTable> : ""}

        </div>    }
            <br></br>
            <Button sx={{ color: PALLETE.BLUE }} startIcon={<ArrowCircleUpSharp />} onClick={() => setIsOpenCustomer(!isOpenCustomer)}>{isOpenCustomer ? 'Customers' : 'Customers'}
              </Button>
              <br></br>
              {isOpenCustomer && 
              
<div>            
{allUser != null ? <GlobalTable head={head} rows={allUser.filter(user=>user.roleId === "3")} whatToAdd="Customer" delete={deleteUser} add={goToAddUser} edit={goToEditUser}></GlobalTable> : ""}

        </div>    }
        </>
    )
}
export default UserTable;