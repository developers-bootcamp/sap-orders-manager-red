import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch } from "../redux/store";

const GlobalAutoComplete = (props: any) => {
  const [data, setData] = useState([{ id: "", name: "" }]);
  let requestTimeout: NodeJS.Timeout | null = null;

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
          .get(`http://localhost:8080${path}/${value}`)
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

  return (
    <>
      <Autocomplete
        onChange={(e) => props.onChangeSelect(e)}
        disablePortal
        id="Autocomplete"
        options={data}
        sx={{ mr: 8 }}
        renderInput={(params) => <TextField {...params} />}
        onInputChange={(event: any, value: string) =>
          getOptionsByProfix(event, value, props.path)
        }
        getOptionLabel={(option) => option.name}
      />
    </>
  );
};

export default GlobalAutoComplete;
