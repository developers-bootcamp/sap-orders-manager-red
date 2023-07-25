import { useEffect, useState } from "react";
import { getAllProduct } from "../../axios/productAxios";
import GlobalTable from "../../components/GlobalTable";
import IProductCategory from "../../interfaces/IProductCategory";
import IProduct from "../../interfaces/IProduct";

const ProductTable: React.FC = () => {
    const [allProduct, setAllProduct] = useState<IProduct[]>()

    const getAllProductAsync = async () => {
        await getAllProduct().then(res => setAllProduct(res.data));
    }
    useEffect(() => {
        getAllProductAsync();
    }, []);

    const head = ["Name", "Description", "Inventory", "Discount", "", "Category", "Price"]

    return (
        <>
            {allProduct != null ? <GlobalTable head={head} rows={allProduct} whatToAdd="item"></GlobalTable> : ""}
        </>
    );
};

export default ProductTable;