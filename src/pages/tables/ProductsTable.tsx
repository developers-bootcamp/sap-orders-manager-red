import { useEffect, useState } from "react";
import { addProduct, deleteProduct, editProduct, getAllProduct } from "../../axios/productAxios";
import GlobalTable from "../../components/GlobalTable";
import IProductCategory from "../../interfaces/IProductCategory";
import IProduct from "../../interfaces/IProduct";
import { getAllCategory } from "../../axios/productCategoryAxios";

const ProductTable: React.FC = () => {
    const [allProduct, setAllProduct] = useState<IProduct[]>()
    const [allCategories, setAllCategories] = useState<IProductCategory[]>()

    useEffect(() => {
        getAllProductAsync();
        getAllCategoryAsync();
    }, []);

    const getAllProductAsync = async () => {
        await getAllProduct().then(res => setAllProduct(res.data));
    }
    const getAllCategoryAsync = async () => {
        await getAllCategory().then(res => setAllCategories(res.data));
    }

    const goToAddProduct = async (product: { Name: string, Description: string, Inventory: number, Discount: number, Type: { name: string }, Category: IProductCategory, Price: number }) => {
        const newProduct: IProduct = {
            name: product.Name,
            desc: product.Description,
            inventory : product.Inventory,
            discount:product.Discount,
            discountType:product.Type.name,
            productCategoryId:product.Category,
            price:product.Price
        }
        await addProduct(newProduct)
    }
    const goToEditProduct=async(id:string,product: {id:string, Name: string, Description: string, Inventory: number, Discount: number, Type: { name: string }, Category: IProductCategory, Price: number })=>{
        const newProduct: IProduct = {
            id:product.id,
            name: product.Name,
            desc: product.Description,
            inventory : product.Inventory,
            discount:product.Discount,
            discountType:product.Type.name,
            productCategoryId:product.Category,
            price:product.Price
        }
        await editProduct(id,newProduct)

    }
    const head =
        [{ name: "Name", type: "text" },
         { name: "Description", type: "text" },
         { name: "Inventory", type: "number" },
         { name: "Discount", type: "number" },
         { name: "Type", type: "autocompletet", options: [{ name: "PERCENTAGE" }, { name: "FIXED_AMOUNT" }] },
         { name: "Category", type: "autocompletet", options: allCategories }, { name: "Price", type: "number" }]
    return (
        <>
            {allProduct != null ? <GlobalTable head={head} rows={allProduct} whatToAdd="item" delete={deleteProduct} add={goToAddProduct} edit={goToEditProduct}></GlobalTable> : ""}
        </>
    );
};

export default ProductTable;