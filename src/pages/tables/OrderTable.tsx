import { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { RootState, useAppDispatch } from "../../redux/store";
import IOrder from "../../interfaces/IOrder";
import IOrderItem from "../../interfaces/IOrderItem";
import { getFailedOrders, getOrders } from "../../axios/orderAxios";
import { setOrders, setFailedOrders, IOrderState, setStatusOrders, setOrder } from "../../redux/slices/sliceOrder";
import { useSelector } from "react-redux";
import GlobalModel from "../../components/GlobalModal";
import giftsImg from '../../img/giftsWithBaloons.png'
import OrderDetailForm from '../../pages/orderDetailForm/OrderDetailForm';
import { async } from "q";

const OrderDetails = (params: any) => {

    return (
        <GlobalModel
            btnOpen={"Edit Details"}
            isButton={false}
            title={"Order Detail"}
            img={giftsImg}
            txtSide={"we are almost done"}
        >
            <OrderDetailForm order={params.row.order}></OrderDetailForm>
        </GlobalModel>
    )
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, cellClassName: 'regularCell' },
    { field: 'customer', headerName: 'Customer', width: 250, cellClassName: 'regularCell' },
    {
        field: 'status', type: 'string', headerName: 'Status', width: 150,
        cellClassName: (params: GridCellParams<any, string>) => {
            switch (params.value) {
                case 'CREATED':
                    return 'green';
                case 'APPROVED':
                    return 'blue';
                case 'PACKING':
                    return 'yellow';
                case 'PAYMENT_FAILED':
                    return 'red';
                case 'PROSSES_FAILED':
                    return 'orang';
                default:
                    return '';
            }
        },
    },
    { field: 'products', headerName: 'Products', width: 400, cellClassName: 'regularCell' },
    { field: 'price', headerName: 'Price', width: 150, cellClassName: 'regularCell' },
    { field: 'createDate', headerName: 'Create Date', width: 200, cellClassName: 'regularCell' },
    { field: 'details', headerName: 'Details', width: 100, renderCell: OrderDetails },
];
const emptyMap: Map<string, object> = new Map();

const OrderTable: React.FC = (props: any) => {

    const dispatch = useAppDispatch();
    const orders: IOrder[] = useSelector<RootState, IOrderState>(state => state.orderReducer).statusOrders;
    const failedOrders: IOrder[] = useSelector<RootState, IOrderState>(state => state.orderReducer).failedOrders;
    const [isLoading, setIsLoading] = useState(true);


    const getAllOrdersAsync = () => {
        console.log('start first')
        getOrders(firstPaginationModel.page, emptyMap)
            .then((res) => {
                dispatch(setStatusOrders(res.data));
                setAllRows(getRows(orders));
                setIsLoading(false);
            })
        console.log('end first')
    }

    const getAllFailedOrdersAsync = () => {
        console.log('start second')
        getFailedOrders(secondPaginationModel.page, emptyMap).then((res) => {
            dispatch(setFailedOrders(res.data));
            setAllFaildRows(getRows(res.data));
        })
        console.log("end second" + { failedOrders })
    }

    const [allRows, setAllRows] = useState([] as { id: string, price: string, status: string, customer: string, products: string, createDate: string, order: IOrder }[])
    const [allFaildRows, setAllFaildRows] = useState([] as { id: string, price: string, status: string, customer: string, products: string, createDate: string, order: IOrder }[])
    const [firstPaginationModel, setfirstPaginationModel] = useState({
        page: 0,
        pageSize: 3,
    });
    const [secondPaginationModel, setSecondPaginationModel] = useState({
        page: 0,
        pageSize: 3,
    });

    useEffect(() => {
        getAllOrdersAsync()
        console.log(firstPaginationModel.page)
    }, [firstPaginationModel]);

    //for socket io
    useEffect(() => {
        setAllRows(getRows(orders));
    }, [orders]);

    useEffect(() => {
        setAllFaildRows(getRows(failedOrders));
    }, [failedOrders]);

    useEffect(() => {
        getAllFailedOrdersAsync()
        console.log(secondPaginationModel.page)
    }, [secondPaginationModel]);


    const getRows = (orders: IOrder[]) => {
        let currentRows: { id: string, price: string, status: string, customer: string, products: string, createDate: string, order: IOrder}[] = []
        
        orders.forEach((e, index) => {
            if (e.customerId?.fullName == null || e.orderItemsList == null || e.orderStatus == null || e.auditData?.createDate == null || e.id == null)
                currentRows.push({ 'id': 'null', 'price': e.totalAmount?.toFixed(2) + '' + e.currency, 'status': 'null', 'customer': "null", 'products': 'null', 'createDate': 'null', 'order': e })
            else {
                let p = ""
                e.orderItemsList.forEach((prod: IOrderItem) => {
                    if (p.length < 40)
                        p += `${prod.quantity} ${prod.productId?.name}, `
                    else {
                        p += `...`;
                    }
                })
                currentRows.push({ 'id': index.toString(), 'price': e.totalAmount?.toFixed(2) + '' + e.currency, 'status': e.orderStatus, 'customer': e.customerId.fullName.toString(), 'products': p, 'createDate': e.auditData?.createDate.toString(), 'order': e })
            }
        })
        return currentRows
    }

    return (
        <>
            {isLoading ? <></> : <DataGrid rows={allRows} columns={columns} disableColumnMenu autoPageSize hideFooterSelectedRowCount
                rowCount={105}
                paginationModel={firstPaginationModel}
                paginationMode="server"
                onPaginationModelChange={setfirstPaginationModel}
                style={{ backgroundColor: "#F2F2F2", height: 267 }}></DataGrid>}
            <br />
            <DataGrid rows={allFaildRows} columns={columns} disableColumnMenu autoPageSize hideFooterSelectedRowCount
                rowCount={8}
                paginationModel={secondPaginationModel}
                paginationMode="server"
                onPaginationModelChange={setSecondPaginationModel}
                style={{ backgroundColor: "#F2F2F2", height: 267 }}></DataGrid>

        </>
    );
}
export default OrderTable;