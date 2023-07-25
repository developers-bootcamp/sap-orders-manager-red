import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const GlobalAutoComplete = (props: any) => {
  const [data, setData] = useState([{ id: "", name: "" }]);
  let requestTimeout: NodeJS.Timeout | null = null;
const {whatChoose}=props;
  const getOptionsByProfix = async (
    event: any,
    value: string,
    path: string
  ) => {
    console.log(new Date().toISOString(), value);
    if (requestTimeout) {
      clearTimeout(requestTimeout);
    }
    if (value.length > 2) {
      requestTimeout = setTimeout(() => {
        console.log(
          "value:",
          value,
          "is send to server at:",
          new Date().toISOString()
        );
        axios
          .get(`http://localhost:8080${path}/${value}`, {headers: {
            token: localStorage.getItem("userToken"),
          }}as any)
          .then((response) => {
            setData(response.data);
            console.log(response);
          })
          .catch((error) => {
            console.log(`http://localhost:8080${path}/${value}`);
            console.log(error);
          });
        // data=fetch...
        // set data according to the type;
      }, 1000);
    }
  };

  const selectOption=(event:Event)=>{
    if(whatChoose){
       whatChoose(event.target);console.log(event.target)}
  }
  return (
    <>
      <Autocomplete
        disablePortal
        id="Autocomplete"
        options={data}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
        onInputChange={(event: any, value: string) =>
          getOptionsByProfix(event, value, props.path)
        }
        getOptionLabel={(option) => option.name}
        onSelect={(e)=>selectOption}
      />
    </>
  );
};

export default GlobalAutoComplete;
