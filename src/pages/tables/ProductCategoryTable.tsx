import { useEffect, useState } from "react";
import { deleteCategory, getAllCategory, addCategory, editCategory } from "../../axios/productCategoryAxios";
import GlobalTable from "../../components/GlobalTable";
import IProductCategory from "../../interfaces/IProductCategory";
import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string().required('Name is a required field').max(20, 'You cannot enter more than 20 letters'),
    desc: Yup.string().required('Name is a required field').max(20, 'You cannot enter more than 20 letters'),
});
const ProductCategoryTable: React.FC = () => {
    const [allCategory, setAllCategory] = useState<IProductCategory[]>()
    const [change ,setChange] = useState(false);

    useEffect(() => {
        getAllCategoryAsync();
        setChange(false)        
    }, [change]);

    const getAllCategoryAsync = async () => {
        await getAllCategory().then(res => setAllCategory(res.data));
    }

    const goToEditCategory = async (category: { id: string, Product?: string, Description?: string,name:string, desc:string }) => {
        const newCategory: any = {
            id: category.id,
            name: category.Product||category.name,
            desc: category.Description||category.desc,
        }
        editCategory(newCategory)
        setChange(true)
    }


    const goToAddCategory = async (category: { Product: string, Description: string }) => {
        const newCategory: IProductCategory = {
            name: category.Product,
            desc: category.Description
        }
        await addCategory(newCategory)
        setChange(true)
    }

    const goToDeleteCategory=async(id:string)=>{
        deleteCategory(id)
        setChange(true);
    }
    const head =
        [{ "name": "Product", "type": "text" },
        { "name": "Description", "type": "text" }]
    return (
        <>
            {allCategory != null ? <GlobalTable head={head} rows={allCategory} whatToAdd="item" delete={goToDeleteCategory} add={goToAddCategory} edit={goToEditCategory}></GlobalTable> : ""}
        </>
    );
};

export default ProductCategoryTable;