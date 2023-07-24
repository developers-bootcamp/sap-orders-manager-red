import { useEffect, useState } from "react";
import { getAllCategory } from "../../axios/productCategoryAxios";
import GlobalTable from "../../components/GlobalTable";
import IProductCategory from "../../interfaces/IProductCategory";

const ProductCategoryTable = () => {
    const [allCategory, setAllCategory] = useState<IProductCategory>()
    const getAllCategoryAsync = async () => {
        await getAllCategory().then(res => setAllCategory(res.data));

    }
    useEffect(() => {
        getAllCategoryAsync();

    }, []);

    const head = ["Product", "Description"]
    return (
        <>
            {allCategory != null ? <GlobalTable rows={allCategory} head={head}></GlobalTable> : ""}
        </>
    );
};

export default ProductCategoryTable;