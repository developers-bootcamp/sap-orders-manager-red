import { useEffect,useState } from "react";
import { getAllUser } from "../../axios/userAxios";
import IUser from "../../interfaces/IUser";
import GlobalTable from "../../components/GlobalTable";

const UserTable=()=>{
    const [allUser,setAllUser]=useState<IUser[]>()
    const getAllUserAsync=async (pageNumber:number)=>{
        await getAllUser(pageNumber).then(res=>setAllUser(res.data));
    }

    useEffect(()=>{
        getAllUserAsync(1);
    },[]);

    const head=["Full Name","Password","Email","Address","Phone"]

    return(
        <>
        {allUser!=null?<GlobalTable  head={head} rows={allUser} whatToAdd="Add User"></GlobalTable>: ""}
        </>
    )
}
export default UserTable;