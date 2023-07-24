import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MyBox, MyInput } from "./FilterPop.Style";
import { DataToFilter, FilterItem } from "./DataToFilter";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import GlobalAutoComplete from "../../components/GlobalAutoComplete";
import { number, string } from "yup";

const FilterPop = (props: any) => {
  const [age, setAge] = useState("");
  const [show, setShow] = useState(false);
  const [indexData, setIndexData] = useState(0);
  const { changeFieldName, key ,changeFilterValue} = props;
  const [dataToShow, setDataToShow] = useState<FilterItem | undefined>(undefined);
  const [fieldToFilter, setFieldToFilter] = useState("status");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedIndex = parseInt(event.target.value);
    changeFieldName(DataToFilter[selectedIndex].fieldName, key);
    setAge(event.target.value as string);
  };

  const handleChangeFieldToFilter = async (event: SelectChangeEvent) => {
    const selectedIndex = parseInt(event.target.value);
    if (!isNaN(selectedIndex)) {
      setIndexData(selectedIndex);
      setFieldToFilter(DataToFilter[selectedIndex].fieldName);
      console.log(DataToFilter[selectedIndex].fieldName);
      console.log(fieldToFilter)
      console.log("message")
      changeFieldName(DataToFilter[selectedIndex].fieldName, key);
      setShow(true);
      const selectedItem = DataToFilter.find((item) => item.fieldName === DataToFilter[selectedIndex].fieldName);
      setDataToShow(selectedItem);
    }
  };

  return (
    <>
      <Box sx={{ minWidth: 400, maxWidth: 800 }}>
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
                label="FieldToFilter"
                onChange={handleChangeFieldToFilter}
                sx={{
                  height: "36px",
                }}
              >
                {DataToFilter.map((item, index) => (
                  <MenuItem value={index} key={index}>
                    {item.fieldName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </MyBox>
        <label>is</label>
        <MyBox>
          <Box>
            <FormControl fullWidth> 
              <InputLabel id="filter" classes={InputLabel}></InputLabel>
              {(indexData==0||(dataToShow?.fieldName === "status") || (dataToShow?.fieldName === "price") || (dataToShow?.fieldName === "priority")) && (
                <Select
                  labelId="filter"
                  id="filter"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                  sx={{ height: "36px" }}
                >
                  {show &&
                    dataToShow?.value.map((item: any, index: number) => (
                      <MenuItem value={index} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              )}
            </FormControl>
          </Box>
        </MyBox>
      </Box>
    </>
  );
};

export default FilterPop;



// import { useState } from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { MyBox, MyInput } from "./FilterPop.Style";
// import {DataToFilter,FilterItem} from "./DataToFilter"
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import GlobalAutoComplete from "../../components/GlobalAutoComplete";
// import { number } from "yup";

// const FilterPop = (props: any) => {
//   const [age, setAge] = useState("");
//   const [show, setShow] = useState(false);
//   const [indexData, setIndexData] = useState(0);
//   const { whatFilters, key } = props;
//   const [dataToShow,setDataToShow]= useState({}as FilterItem) ;//
//   // const arrFieldToFilter = [
//   //   "status",
//   //   "priority",
//   //   "price",
//   //   "date",
//   //   "customer",
//   //   "product",
//   // ];
//   // const filter=()=>{

//   // }
//   const [fieldToFilter, setFieldToFilter] = useState("status");

//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };
//   const handleChangeFieldToFilter = async(event: SelectChangeEvent) => {
//     await setIndexData(parseInt(event.target.value)||0);
//     await setFieldToFilter(dataToShow[parseInt(event.target.value)].value);
//     //await console.log(event.target.value);
//     await whatFilters(event.target.value, key);//function in AllFilter passed in props
//     await setShow(true);
//     await console.log(event);
//     const selectedItem =  await DataToFilter.find((item) => item.fieldName === fieldToFilter);
//     if(selectedItem!=undefined)
//     await  setDataToShow(selectedItem);
//   };

//   return (
//     <>
//       <Box sx={{ minWidth: 400, maxWidth: 800}}>
//         <label>where</label>
//         <MyBox>
//           <Box>
//             {/* <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
//         <Select
//           multiple
//           displayEmpty
//           value={fieldToFilter}
//           onChange={handleChange}
//           // input={<OutlinedInput />}
//           // renderValue={(selected) => {
//           //   if (selected.length === 0) {
//           //     return <em>Placeholder</em>;
//           //   }

//           //   return selected.join(', ');
//           // }}
//           // MenuProps={MenuProps}
//           inputProps={{ 'aria-label': 'Without label' }}
//         ></Select></FormControl> */}
//             <FormControl fullWidth>
//               <InputLabel id="filter" classes={InputLabel}>
//                 Select filter
//               </InputLabel>
//               <Select
//                 labelId="filter"
//                 id="filter"
//                 value={fieldToFilter}
//                 label="fieldToFilter"
//                 onChange={handleChangeFieldToFilter}
//                 sx={{
//                   height: "36px",
//                   // position: "absolute",
//                   //  width: "25vw",
//                   // borderRadius: "0",
//                   // border: "1px solid",
//                   // backgroundColor: "#FFFFFF",
//                 }}
//                 // MenuProps={{ disableScrollLock: true }}
//               >
//                 {DataToFilter.map((item, index) => (
//                   <MenuItem value={index} key={index}>
//                     {item.fieldName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </MyBox>
//         <label>is</label>
//         <MyBox>
//           <Box>
//             <FormControl fullWidth>
//               <InputLabel id="filter" classes={InputLabel}></InputLabel>
//               {((dataToShow.fieldName==="status")||(dataToShow.fieldName==="price")||(dataToShow.fieldName==="priority"))&& (
//                 <Select
//                   labelId="filter"
//                   id="filter"
//                   value={age}
//                   label="Age"
//                   onChange={handleChange}
//                   sx={{ height: "36px" }}
//                 >
//                   {show &&
//                     dataToShow.value.map((item:any, index:number) => (
//                       <MenuItem value={index} key={index}>
//                         {item}
//                       </MenuItem>
//                     ))}
//                 </Select>
//               )}
//               {/* {indexData == 3 && (
//                 <>
//                   <MyInput>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                       <DemoContainer components={["DatePicker"]}>
//                         <DatePicker
//                           label="From date"
//                           slotProps={{ textField: { size: "small" } }}
//                         />
//                       </DemoContainer>
//                     </LocalizationProvider>
//                   </MyInput>
//                   <MyInput>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                       <DemoContainer components={["DatePicker"]}>
//                         <DatePicker
//                           label="To date"
//                           slotProps={{ textField: { size: "small" } }}
//                         />
//                       </DemoContainer>
//                     </LocalizationProvider>
//                   </MyInput>
//                 </>
//               )}
//               {indexData == 4 && (
//                 <div style={{display:"inline",width:"20%"}}>
//                 <GlobalAutoComplete
//                   path={`/user/getNamesOfCustomersByPrefix`}
//                 ></GlobalAutoComplete></div>
//               )}
//               {indexData == 5 && (
//                 <GlobalAutoComplete
//                   path={"/product/names"}
//                 ></GlobalAutoComplete>
//               )} */}
//             </FormControl>
//           </Box>
//         </MyBox>
//       </Box>
//     </>
//   );
// };

// export default FilterPop;
