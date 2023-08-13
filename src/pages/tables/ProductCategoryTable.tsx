import { useEffect, useState } from "react";
import { getAllCategory } from "../../axios/productCategoryAxios";
import GlobalTable from "../../components/GlobalTable";
import IProductCategory from "../../interfaces/IProductCategory";

const ProductCategoryTable: React.FC = () => {
    const [allCategory, setAllCategory] = useState<IProductCategory[]>()

    const getAllCategoryAsync = async () => {
        await getAllCategory().then(res => setAllCategory(res.data));
    }
    
    useEffect(() => {
        getAllCategoryAsync();
    }, []);

    const head = ["Product", "Description"]

    return (
        <>
            {allCategory != null ? <GlobalTable head={head} rows={allCategory} whatToAdd="item"></GlobalTable> : ""}
        </>
    );
};

export default ProductCategoryTable;