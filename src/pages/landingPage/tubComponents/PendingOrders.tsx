import GlobalModel from "../../../components/GlobalModal";
import NewOrderForm from "../../newOrderForm/NewOrderForm";
import giftsImg from "../../../img/giftsWithBaloons.png";

import GlobalPopOver from "../../../components/GlobalPopOver";
// import FilterPop from "../../../pages/filterPop/FilterPop";
import filterImg from "../../../img/filter.png";
import AllFilter from '../../../pages/filterPop/AllFilter';

const PendingOrders: React.FC = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <GlobalModel
          btnOpen={"New Order"}
          isButton={true}
          title={"new order"}
          img={giftsImg}
          txtSide={" we are almost done"}
        >
          <NewOrderForm></NewOrderForm>
        </GlobalModel>

        <div style={{ marginLeft: "3%" }}>
          <GlobalPopOver
            name={"filter"}
            Pop={AllFilter}
            image={filterImg}
          ></GlobalPopOver>
        </div>
      </div>
    </>
  );
};

export default PendingOrders;
