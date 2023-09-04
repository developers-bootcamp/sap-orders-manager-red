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
import { setDefaultResultOrder } from "dns";


const UserTable = () => {
    const [allUser, setAllUser] = useState<IUserDTO[]>();
    const [isOpenAdmin, setIsOpenAdmin] = useState(true);
    const [isOpenEmp, setIsOpenEmp] = useState(true);
    const [isOpenCustomer, setIsOpenCustomer] = useState(true);
    const[change,setChange]=useState(false);
    const[disable,setDisable]=useState(true);
    const[error,setError]=useState(false)
    const [errorMessage,setErrorMessage]=useState(" ")

    const getAllUserAsync = async (pageNumber: number) => {
        await getAllUser(pageNumber).then(res =>{ setAllUser(res.data);console.log(res.data)});
    }


    useEffect(() => {
        getAllUserAsync(0); 
        setChange(false);       
    },[change]);

    const goToEditUser = async (user: { FullName: string, Password: string, Phone: string, Email: string, Address: string, id: string}) => {
        const editUser1: IUserDTO = {
            fullName: user.FullName,
            password: user.Password,
            phone: user.Phone,
            address: user.Address,
            email: user.Email,
        }
        editUser(user.id, editUser1);
        setChange(true);
    }
debugger
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
        await addUser(addUser1).catch(error=>{
            setError(true);
            if(error.code=='UnsupportedOperationException'){
                setErrorMessage('cannot add Administrator')
            }
            else{
                setErrorMessage('the request cannot be complete please try again')
            }
        });
       
        setChange(true);

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
        setChange(true);
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
        setChange(true);
    }

    const goToDeleteUser=async(id:string)=>{
        deleteUser(id);
        setChange(true);
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
            fullName:user.fullName,
            password:"*********",
            email:user.email,
            address:user.address,
            phone:user.phone
        }))
        
        
        } whatToAdd="Administrator" delete={goToDeleteUser} add={ goToAddAdmin} edit={goToEditUser}></GlobalTable> : ""}
        </div>    }
            <br></br>
            <Button sx={{ color: PALLETE.YELLOW }} startIcon={<ArrowCircleUpSharp />} onClick={() => setIsOpenEmp(!isOpenEmp)}>{isOpenEmp ? 'Employees' : 'Employees'}
              </Button>
              <br></br>
              {isOpenEmp && 
              
<div>            {allUser != null ? <GlobalTable head={head} rows={allUser.filter(user=>user.roleId === "2")
.map(user=>({
    id: user.id,
    fullName:user.fullName,
    password:"*********",
    email:user.email,
    address:user.address,
    phone:user.phone
}))
} whatToAdd="Employee" delete={goToDeleteUser} add={goToAddEmp} edit={goToEditUser}></GlobalTable> : ""}

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
            fullName:user.fullName,
            password:"*********",
            email:user.email,
            address:user.address,
            phone:user.phone
}))
} whatToAdd="Customer" delete={goToDeleteUser} add={goToAddCust} edit={goToEditUser}></GlobalTable> : ""}

        </div>    }
        </>
    )
}
export default UserTable;