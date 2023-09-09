import { useEffect, useState } from "react";
import { deleteCategory, getAllCategory, addCategory, editCategory } from "../../axios/productCategoryAxios";
import GlobalTable from "../../components/GlobalTable";
import IProductCategory from "../../interfaces/IProductCategory";
import { Alert, Button } from "@mui/material";
import { PALLETE } from "../../config/config";
import { ArrowCircleUpSharp } from "@mui/icons-material";
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';

const ProductCategoryTable: React.FC = () => {
    const [allCategory, setAllCategory] = useState<IProductCategory[]>()
    const [change, setChange] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [openTable, setOpenTable] = useState(true);

    useEffect(() => {
        getAllCategoryAsync();
        setChange(false)
    }, [change]);

    const getAllCategoryAsync = async () => {
        await getAllCategory().then(res => setAllCategory(res.data));
    }

    const goToEditCategory = async (category: { id: string, Name?: string, Description?: string, name: string, desc: string }) => {
        const newCategory: any = {
            id: category.id,
            name: category.Name || category.name,
            desc: category.Description || category.desc,
        }
        editCategory(newCategory)
        setChange(true)
    }


    const goToAddCategory = async (category: { Name: string, Description: string }) => {
        debugger
        const newCategory: IProductCategory = {
            name: category.Name,
            desc: category.Description
        }
        await addCategory(newCategory).catch(error => {
            setError(true);
            if (error.response.status == 409) {
                setErrorMessage('an existing category cannot be added')
            }
            else {
                setErrorMessage('the request could not be completed, please try again')
            }
        })
        setChange(true)
    }

    const goToDeleteCategory = async (id: string) => {
        deleteCategory(id)
        .catch(error => {
            setError(true);
            if (error.response.status == 'ERR_BAD_REQUEST') {
                setErrorMessage('an existing category cannot be added')
            }
            else {
                setErrorMessage('the request could not be completed, please try again')
            }});
        setChange(true);
    }
    const head =
        [{ "name": "Name", "type": "text" },
        { "name": "Description", "type": "text" }]
    return (
        <>
           <div> <Button sx={{ color: PALLETE.RED }} startIcon={<ArrowCircleUpSharp />} onClick={() => setOpenTable(!openTable)}>product category</Button></div>
            {allCategory != null && openTable ? <GlobalTable howCanChnge="ADMIN" head={head} rows={allCategory} whatToAdd="item" delete={goToDeleteCategory} add={goToAddCategory} edit={goToEditCategory}></GlobalTable> : ""}
            {error ? <Alert severity="error" sx={{ mt: 3 }}>
                {`Oops... ${errorMessage}`}
            </Alert> : ""}
        </>
    );
};

export default ProductCategoryTable;