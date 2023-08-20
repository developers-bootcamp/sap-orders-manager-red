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

    useEffect(() => {
        getAllCategoryAsync();
    }, []);

    const getAllCategoryAsync = async () => {
        await getAllCategory().then(res => setAllCategory(res.data));
    }

    const goToEditCategory = async (id: string, category: { id: string, Product: string, Description: string }) => {
        const newCategory: IProductCategory = {
            id: category.id,
            name: category.Product,
            desc: category.Description,
        }
        editCategory(id, newCategory)
    }


    const goToAddCategory = async (category: { Product: string, Description: string }) => {
        const newCategory: IProductCategory = {
            name: category.Product,
            desc: category.Description
        }
        await addCategory(newCategory)
    }
    const head =
        [{ "name": "Product", "type": "text" },
        { "name": "Description", "type": "text" }]
    return (
        <>
            {allCategory != null ? <GlobalTable head={head} rows={allCategory} whatToAdd="item" delete={deleteCategory} add={goToAddCategory} edit={goToEditCategory}></GlobalTable> : ""}
        </>
    );
};

export default ProductCategoryTable;