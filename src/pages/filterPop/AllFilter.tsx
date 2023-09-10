import { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
import { PALLETE } from "../../config/config";
import FilterPop from "./FilterPop";

const AllFilter = (props: any) => {
  type Filter = {
    fieldName: string;
    filterValue: any;
};
  const [filters, setFilters] = useState<Filter[]>([{ fieldName: "orderStatus", filterValue: "DONE" },]);
  const { filterTables } = props;
  const addFilter = () => {
    setFilters((prevFilters) => [
      ...prevFilters,
      { fieldName: "orderStatus", filterValue: "DONE" },
    ]);
  };
  const changeFieldName = async (filter: string, index: number) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], fieldName: filter };
    setFilters(updatedFilters); console.log("f", filters);
  };
  const changeFilterValue = async (filter: any, index: number) => {
    const updatedFilters = [...filters];
debugger
    if((filters[index]).fieldName !=="price")
      updatedFilters[index] = { ...updatedFilters[index], filterValue: filter };
    else
      updatedFilters[index] = { ...updatedFilters[index], filterValue: [...filter] };
    setFilters(updatedFilters);
  };

  const arrayToDictionary = () => {
    return filters.reduce((dictionary:any, item) => {
      const filtered=`${item.fieldName.toString()}`;
      dictionary[filtered] = item.filterValue;
      return dictionary;
    }, {});
  }
  const filterOrder = () => {
    filterTables(arrayToDictionary());
  }
  useEffect(() => {
    console.log("filters", filters);
  }, [filters])
  return (
    <>
      {filters.map((filter, index) => (
        <FilterPop keyIndex={index} changeFieldName={changeFieldName} changeFilterValue={changeFilterValue}></FilterPop>
      ))}

      <label onClick={addFilter}>
        <AddCircleOutlineIcon /> Add new filter
      </label>
      <Button
        variant="contained"
        style={{
          background: PALLETE.GREEN,
          textTransform: "none",
          marginLeft: "75%",
        }}
        onClick={filterOrder}
      >
        Apply
      </Button>
    </>
  );
};

export default AllFilter;
