import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, Link, MenuItem, Select, Typography } from "@mui/material";
import { PALLETE } from "../config/config";
import { MyDetailsDiv, MyGiftImg, MyOpenDialog, MySideBackImg, MyTxtSide } from "../components/GlobalModal.style";
import React from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import Chart from "react-google-charts";

export const data = [
    ["Object", "Count"],
    ["2004/05", 165],
    ["2005/06", 135],
    ["2006/07", 157],
    ["2007/08", 139],
    ["2008/09", 136],
];

export const options = {
    isStacked: true,
    //   title: "Monthly Coffee Production by Country",
    //   vAxis: { title: "Cups" },
    //   hAxis: { title: "Month" },
    seriesType: "bars",
    backgroundColor: `${PALLETE.GRAY}`,
    padding: 0,
    legend: { position: "none" },
};


export const DashboardGenerator: React.FC = () => {

    const ordersList = ["month-year", "employee", "customer"]
    const productsList = ["month-year", "id", "categoryId"]
    const usersList = ["month-year", "role"]

    const [open, setOpen] = React.useState(false)
    const [collection, setCollection] = React.useState('10')
    const [item, setItem] = React.useState('0')
    const [list1, setList] = React.useState(ordersList)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleChangeCollection = (event: SelectChangeEvent) => {
        debugger
        let tempCollection = event.target.value
        setCollection(tempCollection);
        if (tempCollection === '10')
        {
            debugger
            setList(ordersList)
        }
        else if (tempCollection === '20')
        {
            debugger
            setList(productsList)
        }
        else
        {
            debugger
            setList(usersList)
        }
    }

    const handleChangeItem = (event: SelectChangeEvent) => {
        setItem(event.target.value as string);
    }

    return (
        <>
            <Button onClick={handleClickOpen}>
                + create new board
            </Button>
            <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent sx={{ p: 5, height: '42rem', backgroundColor: PALLETE.GRAY }}>
                    <Grid item container xs={12} sm={12}>
                        <Grid item xs={12} sm={6} sx={{ pr: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Collection</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={collection}
                                    label="Collection"
                                    onChange={handleChangeCollection}
                                >
                                    <MenuItem value={"10"}>Orders</MenuItem>
                                    <MenuItem value={"20"}>Products</MenuItem>
                                    <MenuItem value={"30"}>Users</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={item}
                                    label="Item"
                                    onChange={handleChangeItem}
                                >
                                    {
                                        list1.map((item, index) => (
                                            <MenuItem value={index}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Chart
                            chartType="ComboChart"
                            width="100%"
                            height="500px"
                            data={data}
                            options={options}
                        />
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};