import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MyBox } from "./FilterPop.Style";

const FilterPop = (props:any) => {
  const [age, setAge] = useState("");
  const {whatFilters,key}=props;
  const arrFieldToFilter = [
    "status",
    "priority",
    "customer",
    "price",
    "prosuct",
    "create date",
  ];
  // const filter=()=>{

  // }
  const [fieldToFilter, setFieldToFilter] = useState("status");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const handleChangeFieldToFilter = (event: SelectChangeEvent) => {
    setFieldToFilter(event.target.value as string);
    whatFilters(event.target.value,key);
  };

  return (
    <>
      <Box sx={{ minWidth: 400, maxWidth: 500 }}>
        <label>where</label>
        <MyBox>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="filter" classes={InputLabel}>
              Select filter
            </InputLabel>
            <Select
              labelId="filter"
              id="filter"
              value={fieldToFilter}
              label="fieldToFilter"
              onChange={handleChangeFieldToFilter}
              sx={{
                height: "36px",
                // width: "100%",
                // borderRadius: "0",
                // border: "1px solid",
                // backgroundColor: "#FFFFFF",
              }}
              // MenuProps={{ disableScrollLock: true }}
            >
              {arrFieldToFilter.map((item, index) => (
                <MenuItem value={index}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        </MyBox>
        <label>is</label>
        <MyBox>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="filter" classes={InputLabel}>
              done
            </InputLabel>
            <Select
              labelId="filter"
              id="filter"
              value={age}
              label="Age"
              onChange={handleChange}
              sx={{ height: "36px" }}
            >
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
        </Box>
        </MyBox>
      </Box>
    </>
  );
};

export default FilterPop;
