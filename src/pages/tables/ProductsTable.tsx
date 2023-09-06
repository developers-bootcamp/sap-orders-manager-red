import { useEffect, useState } from "react";
import { addProduct, deleteProduct, editProduct, getAllProduct } from "../../axios/productAxios";
import GlobalTable from "../../components/GlobalTable";
import IProductCategory from "../../interfaces/IProductCategory";
import IProduct from "../../interfaces/IProduct";
import { getAllCategory } from "../../axios/productCategoryAxios";
import { PALLETE } from "../../config/config";
import { ArrowCircleUpSharp } from "@mui/icons-material";
import { Button } from "@mui/material";

const ProductTable: React.FC = () => {
    const [allProduct, setAllProduct] = useState<IProduct[]>();
    const [allCategories, setAllCategories] = useState<IProductCategory[]>();
    const [change, setChange] = useState(false);
    const [openTable, setOpenTable] = useState(true);

    useEffect(() => {
        getAllProductAsync();
        getAllCategoryAsync();
        setChange(false)
    }, [change]);

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
             inventory: product.Inventory,
             discount: product.Discount,
             discountType: product.Type.name,
             productCategoryName: product.Category.name,
             price: product.Price
         }
         await addProduct(newProduct)
         setChange(true)
    }
    const goToEditProduct = async (product: {
        id: string, Name?: string, Description?: string, Inventory?: number, Discount?: number, Type?: { name: string }, Category?: IProductCategory, Price?: number
        , name: string, dest: string, inventory: number, discount: number, discountType: { name: string }, productCategoryId: IProductCategory, price: number
    }) => {

        const newProduct: IProduct = {
            id: product.id,
            name: product.Name || product.name,
            desc: product.Description || product.dest,
            inventory: product.Inventory || product.inventory,
            discount: product.Discount || product.inventory,
            discountType: product.Type?.name || product.discountType.name,
            productCategoryName: product.Category?.name || product.productCategoryId.name,
            price: product.Price || product.price
        }
        await editProduct(newProduct).then(() => {console.log(newProduct); })
        setChange(true);
    }
    const goToDeleteProduct = async (id: string) => {
        deleteProduct(id);
        setChange(true);
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
            <Button sx={{ color: PALLETE.BLUE }} startIcon={<ArrowCircleUpSharp />} onClick={() => setOpenTable(!openTable)}>product</Button>
            {allProduct != null&&openTable ? <GlobalTable howCanChnge="ADMIN" head={head} rows={allProduct} whatToAdd="item" delete={goToDeleteProduct} add={goToAddProduct} edit={goToEditProduct}></GlobalTable> : ""}
        </>
    );
};

export default ProductTable;