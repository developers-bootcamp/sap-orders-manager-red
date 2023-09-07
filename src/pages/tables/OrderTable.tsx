import { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";
import { RootState, useAppDispatch } from "../../redux/store";
import IOrder from "../../interfaces/IOrder";
import IOrderItem from "../../interfaces/IOrderItem";
import { getFailedOrders, getOrders } from "../../axios/orderAxios";
import {
  setOrders,
  setFailedOrders,
  IOrderState,
  setStatusOrders,
  setSecondPaginationModel,
  setfirstPaginationModel,
} from "../../redux/slices/sliceOrder";
import { useSelector } from "react-redux";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100, cellClassName: "regularCell" },
  {
    field: "customer",
    headerName: "Customer",
    width: 250,
    cellClassName: "regularCell",
  },
  {
    field: "status",
    type: "string",
    headerName: "Status",
    width: 150,
    cellClassName: (params: GridCellParams<any, string>) => {
      switch (params.value) {
        case "CREATED":
          return "green";
        case "APPROVED":
          return "blue";
        case "PACKING":
          return "yellow";
        case "PAYMENT_FAILED":
          return "red";
        case "PROSSES_FAILED":
          return "orang";
        default:
          return "";
      }
    },
  },
  {
    field: "products",
    headerName: "Products",
    width: 400,
    cellClassName: "regularCell",
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    cellClassName: "regularCell",
  },
  {
    field: "createDate",
    headerName: "Create Date",
    width: 300,
    cellClassName: "regularCell",
  },
];
const emptyMap: Map<string, object> = new Map();

const OrderTable: React.FC = (props: any) => {
  const dispatch = useAppDispatch();
  const orders: IOrder[] = useSelector<RootState, IOrderState>(
    (state) => state.orderReducer
  ).statusOrders;
  const failedOrders: IOrder[] = useSelector<RootState, IOrderState>(
    (state) => state.orderReducer
  ).failedOrders;
  const [isLoading, setIsLoading] = useState(true);

  const getAllOrdersAsync = () => {
    console.log("start first");
    getOrders(firstPaginationModel.page, emptyMap).then((res) => {
      console.log(res);
      dispatch(setStatusOrders(res.data));
      setAllRows(getRows(orders));
      setIsLoading(false);
    });
    console.log("end first");
  };

  const getAllFailedOrdersAsync = () => {
    console.log("start second");
    getFailedOrders(secondPaginationModel.page, emptyMap).then((res) => {
      dispatch(setFailedOrders(res.data));
      setAllFaildRows(getRows(res.data));
    });
    console.log("end second" + { failedOrders });
  };

  const [allRows, setAllRows] = useState(
    [] as {
      id: string;
      price: string;
      status: string;
      customer: string;
      products: string;
      createDate: string;
    }[]
  );
  const [allFaildRows, setAllFaildRows] = useState(
    [] as {
      id: string;
      price: string;
      status: string;
      customer: string;
      products: string;
      createDate: string;
    }[]
  );
  // const [firstPaginationModel, setfirstPaginationModel] = useState({
  //     page: 0,
  //     pageSize: 3,
  // });
  // const [secondPaginationModel, setSecondPaginationModel] = useState({
  //     page: 0,
  //     pageSize: 3,
  // });

  const firstPaginationModel  = useSelector<RootState, IOrderState>(
    (state) => state.orderReducer
  ).firstPaginationModel;
  const secondPaginationModel  = useSelector<RootState, IOrderState>(
    (state) => state.orderReducer
  ).secondPaginationModel;
  useEffect(() => {
    getAllOrdersAsync();
    console.log(firstPaginationModel.page);
  }, [firstPaginationModel]);

  //for socket io
  useEffect(() => {
    setAllRows(getRows(orders));
  }, [orders]);

  useEffect(() => {
    setAllFaildRows(getRows(failedOrders));
  }, [failedOrders]);

  useEffect(() => {
    getAllFailedOrdersAsync();
    console.log(secondPaginationModel.page);
  }, [secondPaginationModel]);

  // useEffect(() => {
  //     const fetchData = () => {
  //         try {
  //             getAllFailedOrdersAsync();
  //             console.log('been');
  //             getAllOrdersAsync();
  //         } catch (error) {
  //             console.error(error);
  //         }
  //     };
  //     fetchData();
  // }, []);

  const getRows = (orders: IOrder[]) => {
    let currentRows: {
      id: string;
      price: string;
      status: string;
      customer: string;
      products: string;
      createDate: string;
    }[] = [];
    orders.forEach((e, index) => {
      if (
        e.customerId?.fullName == null ||
        e.orderItemsList == null ||
        e.orderStatus == null ||
        e.auditData?.createDate == null ||
        e.id == null
      )
        currentRows.push({
          id: "null",
          price: e.totalAmount + "$",
          status: "null",
          customer: "null",
          products: "null",
          createDate: "null",
        });
      else {
        let p = "";
        e.orderItemsList.forEach((prod: IOrderItem) => {
          if (p.length < 40) p += `${prod.quantity} ${prod.productId?.name}, `;
          else {
            p += `...`;
          }
        });
        currentRows.push({
          id: index.toString(),
          price: e.totalAmount + "$",
          status: e.orderStatus,
          customer: e.customerId.fullName.toString(),
          products: p,
          createDate: e.auditData?.createDate.toString(),
        });
      }
    });
    return currentRows;
  };

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <DataGrid
          rows={allRows}
          columns={columns}
          disableColumnMenu
          autoPageSize
          hideFooterSelectedRowCount
          rowCount={105}
          paginationModel={firstPaginationModel}
          paginationMode="server"
          onPaginationModelChange={()=> dispatch(setfirstPaginationModel())}
          style={{ backgroundColor: "#F2F2F2", height: 267, margin: 10 }}
        ></DataGrid>
      )}
      <br />
      <DataGrid
        rows={allFaildRows}
        columns={columns}
        disableColumnMenu
        autoPageSize
        hideFooterSelectedRowCount
        rowCount={8}
        paginationModel={secondPaginationModel}
        paginationMode="server"
        onPaginationModelChange={()=>dispatch(setSecondPaginationModel())}
        style={{ backgroundColor: "#F2F2F2", height: 267 }}
      ></DataGrid>
    </>
  );
};
export default OrderTable;
