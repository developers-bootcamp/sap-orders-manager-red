import { useEffect,useState } from "react";
import { getAllUser } from "../../axios/userAxios";
import IUser from "../../interfaces/IUser";

const UserTable=()=>{
    const [allUser,setAllUser]=useState<IUser>()
    const getAllUserAsync=async ()=>{
        await getAllUser().then(res=>setAllUser(res.data));
    }

    useEffect(()=>{
        getAllUserAsync();
    },[]);

    const head=["Full Name","Password","Email","Address","Phone"]

    return(
        <>
        {/* {allUser!=null?<Gl} */}
        </>
    )
}
export default UserTable;