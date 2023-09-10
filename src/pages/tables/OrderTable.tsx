import { useEffect, useState } from "react";
import { GridColDef, GridCellParams } from '@mui/x-data-grid';
import { RootState, useAppDispatch } from "../../redux/store";
import IOrder from "../../interfaces/IOrder";
import IOrderItem from "../../interfaces/IOrderItem";
import { getFailedOrders, getOrders } from "../../axios/orderAxios";
import { setFailedOrders, IOrderState, setStatusOrders} from "../../redux/slices/sliceOrder";
import { useSelector } from "react-redux";
import GlobalModel from "../../components/GlobalModal";
import giftsImg from '../../img/giftsWithBaloons.png'
import OrderDetailForm from '../../pages/orderDetailForm/OrderDetailForm';
import { StyledDataGrid } from "./OrderTable.styles";

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

const boldheader: any = (params: any) => {
    return (
        <strong style={{ color: "grey" }}>{params.field}</strong>
    )
}

const columns: GridColDef[] = [
    {
        field: 'id', headerName: 'ID', width: 75, cellClassName: (params: GridCellParams<any, string>) => {
            switch (params.row.status) {
                case 'NEW':
                    return 'green-border';
                case 'APPROVED':
                    return 'blue-border';
                case 'PACKING':
                    return 'yellow-border';
                case 'CANCELLED':
                    return 'red-border';
                case 'DELIVERED':
                    return 'orang-border';
                case 'CHARGING':
                    return 'yellow-border';
                default:
                    return '';
            }
        }, renderHeader: boldheader
    },
    { field: 'customer', headerName: 'Customer', width: 300, cellClassName: 'regularCell', renderHeader: boldheader },
    {
        field: 'status', type: 'string', headerName: 'Status', width: 150,
        cellClassName: (params: GridCellParams<any, string>) => {
            switch (params.value) {
                case 'NEW':
                    return 'green';
                case 'APPROVED':
                    return 'blue';
                case 'PACKING':
                    return 'yellow';
                case 'CANCELLED':
                    return 'red';
                case 'DELIVERED':
                    return 'orang';
                case 'CHARGING':
                    return 'yellow';
                default:
                    return '';
            }
        }, renderHeader: boldheader
    },
    { field: 'products', headerName: 'Products', width: 450, cellClassName: 'regularCell', renderHeader: boldheader },
    { field: 'price', headerName: 'Price', width: 150, cellClassName: 'regularCell', renderHeader: boldheader },
    { field: 'createDate', headerName: 'Create Date', width: 200, cellClassName: 'regularCell', renderHeader: boldheader },
    { field: 'details', headerName: 'Details', width: 150, renderCell: OrderDetails, renderHeader: boldheader },
];
const emptyMap: Map<string, object> = new Map();

const OrderTable = (props: any) => {

    const dispatch = useAppDispatch();
    const orders: IOrder[] = useSelector<RootState, IOrderState>(state => state.orderReducer).statusOrders;
    const failedOrders: IOrder[] = useSelector<RootState, IOrderState>(state => state.orderReducer).failedOrders;
    const [isLoading, setIsLoading] = useState(true);


    const getAllOrdersAsync = () => {
        console.log('start first')
        getOrders(firstPaginationModel.page, filters)
            .then((res) => {
                dispatch(setStatusOrders(res.data));
                setAllRows(getRows(orders));
                setIsLoading(false);
            })
        console.log('end first')
    }

    const getAllFailedOrdersAsync = () => {
        console.log('start second')
        getFailedOrders(secondPaginationModel.page, filters).then((res) => {
            dispatch(setFailedOrders(res.data));
            setAllFaildRows(getRows(res.data));
        })
        console.log("end second" + { failedOrders })
    }

    const [allRows, setAllRows] = useState([] as { id: string, price: string, status: string, customer: string, products: string, createDate: string, order: IOrder }[])
    const [allFaildRows, setAllFaildRows] = useState([] as { id: string, price: string, status: string, customer: string, products: string, createDate: string, order: IOrder }[])
    const[firstPaginationModel,setfirstPaginationModel]=useState({
        page:0,
        pageSize:3,
      });
    const [secondPaginationModel,setSecondPaginationModel]=useState({
        page:0,
        pageSize:3,
      });
    const filters=useSelector<RootState, IOrderState>(state => state.orderReducer).filters;
    useEffect(() => {
        getAllOrdersAsync()
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
    }, [secondPaginationModel]);

    useEffect(() => {
        setSecondPaginationModel({
            ...secondPaginationModel,
            page: 0,
          });
          setfirstPaginationModel({
            ...firstPaginationModel,
            page: 0,
          });
    }, [filters]);

    const getRows = (orders: IOrder[]) => {
        let currentRows: { id: string, price: string, status: string, customer: string, products: string, createDate: string, order: IOrder }[] = []

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

    // const disSetFirstModel=(e:any)=>{
    //     // e.preventDefault();
    //   dispatch(setfirstPaginationModel())
    // }
    // const disSetSecondModel=(e:any)=>{
    //     // e.preventDefault();
    //   console.log("disSetSecondModel ")
    //   dispatch(setSecondPaginationModel())
    // }
      
    return (
        <>
            {isLoading ? <></> :
            <StyledDataGrid rows={allRows} columns={columns} disableColumnMenu autoPageSize hideFooterSelectedRowCount
                rowCount={105}
                paginationModel={firstPaginationModel}
                paginationMode="server"
                onPaginationModelChange={setfirstPaginationModel}
            ></StyledDataGrid>}
            <br/>
            <StyledDataGrid rows={allFaildRows} columns={columns} disableColumnMenu autoPageSize hideFooterSelectedRowCount
                rowCount={8}
                paginationModel={secondPaginationModel}
                paginationMode="server"
                onPaginationModelChange={setSecondPaginationModel}
            ></StyledDataGrid>

        </>
    );
}
export default OrderTable;