import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
import { PALLETE} from "../../config/config";
import FilterPop from "./FilterPop";
import axios from "axios";

const AllFilter = () => {
  const [filters, setFilters] = useState([{ fieldName: "status", filterValue: "DONE" },]);

  const addFilter = () => {
    setFilters((prevFilters) => [
      ...prevFilters,
      { fieldName: "status", filterValue: "DONE" },
    ]);
  };
  const whatFilter =async (filter: string, index: number) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], fieldName: filter };
    setFilters(updatedFilters);
   
  };
  return (
    <>
      {filters.map((filter, index) => (
        <FilterPop key={index} whatFilters={whatFilter}></FilterPop>
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
      >
        Apply
      </Button>
    </>
  );
};

export default AllFilter;
