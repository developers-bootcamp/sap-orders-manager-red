import { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { RootState, useAppDispatch } from "../../redux/store";
import IOrder from "../../interfaces/IOrder";
import IOrderItem from "../../interfaces/IOrderItem";
import { getFailedOrders, getOrders } from "../../axios/orderAxios";
import { setOrders, setFailedOrders, IOrderState, setStatusOrders } from "../../redux/slices/sliceOrder";
import { AddButtons, Head, TableCells, TableRows, Footer, Edit } from "../../components/GlobalTable.style"
import { useSelector } from "react-redux";
import { Console } from "console";


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
    { field: 'price', headerName: 'Price', width: 100, cellClassName: 'regularCell' },
    { field: 'createDate', headerName: 'Create Date', width: 300, cellClassName: 'regularCell' },
];

const emptyMap: Map<string, object> = new Map();


const OrderTable: React.FC = (props: any) => {




    const dispatch = useAppDispatch();
    const listOfOrders: IOrder[] = useSelector<RootState, IOrderState>(state => state.orderReducer).statusOrders;
    const listOfFailedOrders: IOrder[] = useSelector<RootState, IOrderState>(state => state.orderReducer).failedOrders;

    // const getAllOrdersAsync = async () => {
    //     console.log(firstPaginationModel.page)
    //     await getOrders(firstPaginationModel.page, props).then((res) => { dispatch(setStatusOrders(res.data)) })
    //         .finally(() => setAllRows(getRows(listOfOrders)))
    // }
    const [isLoading, setIsLoading] = useState(true);
    const getAllOrdersAsync = async () => {
        console.log('start first')
        await getOrders(firstPaginationModel.page, emptyMap)
            .then((res) => { dispatch(setStatusOrders(res.data)) })
            .finally(() => {
                setAllRows(getRows(listOfOrders));
                setIsLoading(false); // Set loading state to false
            });
        console.log('end second')
    }

    const getAllFailedOrdersAsync = async () => {
        console.log('start second')
        await getFailedOrders(secondPaginationModel.page, emptyMap).then((res) => { dispatch(setFailedOrders(res.data)) })
            .finally(() => setAllFaildRows(getRows(listOfFailedOrders)))
        console.log("end second"+{listOfFailedOrders})
    }

    const [allRows, setAllRows] = useState([] as { id: string, price: string, status: string, customer: string, products: string, createDate: string }[])
    const [allFaildRows, setAllFaildRows] = useState([] as { id: string, price: string, status: string, customer: string, products: string, createDate: string }[])
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

    useEffect(() => {
        getAllFailedOrdersAsync()
    },[secondPaginationModel]);

    useEffect(() => {
        getAllFailedOrdersAsync()
        console.log('been')
        getAllOrdersAsync()
    }, []);
    useEffect(() => {
  const fetchData = async () => {
    try {
      await getAllFailedOrdersAsync();
      console.log('been');
      await getAllOrdersAsync();
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);

    const getRows = (orders: IOrder[]) => {
        let currentRows: { id: string, price: string, status: string, customer: string, products: string, createDate: string }[] = [
        ]
        orders.forEach((e, index) => {
            if (e.customerId?.fullName == null || e.orderItemsList == null || e.orderStatus == null || e.auditData?.createDate == null || e.id == null)
                currentRows.push({ 'id': 'null', 'price': e.totalAmount + '$', 'status': 'null', 'customer': "null", 'products': 'null', 'createDate': 'null' })
            else {
                let p = ""
                e.orderItemsList.forEach((prod: IOrderItem) => {
                    if (p.length < 40)
                        p += `${prod.quantity} ${prod.productId?.name}, `
                    else {
                        p += `...`;
                    }
                })
                currentRows.push({ 'id': index.toString(), 'price': e.totalAmount + "$", 'status': e.orderStatus, 'customer': e.customerId.fullName.toString(), 'products': p, 'createDate': e.auditData?.createDate.toString() })
            }
        })
        return currentRows
    }

    return (
        <>
            {isLoading ? <>fyuy</> : <DataGrid rows={allRows} columns={columns} disableColumnMenu autoPageSize hideFooterSelectedRowCount
                rowCount={105}
                paginationModel={firstPaginationModel}
                paginationMode="server"
                onPaginationModelChange={setfirstPaginationModel}
                style={{ backgroundColor: "#F2F2F2", height: 267, margin: 10 }}></DataGrid>}
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