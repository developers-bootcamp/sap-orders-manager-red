import { Button, Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { PALLETE } from "../config/config";
import React, { useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import Chart from "react-google-charts";
import { dynamicGraph } from "../axios/graphAxios";
import Loader from "../components/loading/Loader";

export const DashboardGenerator: React.FC = () => {

    const COLLECTION = ["Order", "Product", "User"]

    const ordersList = [
        ["month-year", "month-year"],
        ["employeeId", "employee"],
        ["customerId", "customer"]
    ]

    const productsList = [
        ["month-year", "month-year"],
        ["productCategoryId", "category"]
    ]

    const usersList = [
        ["month-year", "month-year"],
        ["roleId", "role"]
    ]

    const [open, setOpen] = React.useState(false)
    const [collection, setCollection] = React.useState("Order")
    const [field, setField] = React.useState("month-year")
    const [listFields, setListFields] = React.useState(ordersList)

    const options = {
        isStacked: true,
        title: `Grouping ${collection}s by ${field}`,
        vAxis: { title: "Count" },
        hAxis: { title: field },
        seriesType: "bars",
        backgroundColor: `${PALLETE.GRAY}`,
        padding: 0,
        margin: 0,
        legend: { position: "none" },
    };

    const [data, setData] = useState([["", ""]])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeCollection = (event: SelectChangeEvent) => {
        let tempCollection = event.target.value
        setCollection(tempCollection);
        if (tempCollection === "Order")
            setListFields(ordersList)
        else if (tempCollection === 'Product')
            setListFields(productsList)
        else
            setListFields(usersList)
        setField("month-year")
    }

    const handleChangeItem = (event: SelectChangeEvent) => {
        setField(event.target.value as string);
    }

    const create = () => {
        dynamicGraph(collection, field)
            .then(res => {
                console.log(res.data);
                setData([[collection, "Count"],])
                let arr = [...res.data]
                arr.forEach(element => {
                    if (element.obj !== null)
                        if (field === "roleId" || field === "productCategoryId")
                            setData(prevData => [...prevData, [element.obj.name, element.count]])
                        else if (field === "month-year")
                            setData(prevData => [...prevData, [element.obj, element.count]])
                        else
                            setData(prevData => [...prevData, [element.obj.fullName, element.count]])
                })
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <Button onClick={handleClickOpen}>
                + create new board
            </Button>
            <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent sx={{ p: 5, height: '42rem', backgroundColor: PALLETE.GRAY }}>
                    <Grid item container xs={12} sm={12}>
                        <Grid item xs={12} sm={5} sx={{ pr: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="collectionLabel">Collection</InputLabel>
                                <Select
                                    labelId="collection"
                                    id="collection"
                                    value={collection}
                                    label="Collection"
                                    onChange={handleChangeCollection}
                                >
                                    {
                                        COLLECTION.map((i) => (
                                            <MenuItem value={i}>{i}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl fullWidth>
                                <InputLabel id="fieldLabel">Field</InputLabel>
                                <Select
                                    labelId="field"
                                    id="field"
                                    value={field}
                                    label="Field"
                                    onChange={handleChangeItem}
                                >
                                    {
                                        listFields.map((f) => (
                                            <MenuItem value={f[0]}>{f[1]}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth>
                                <Button variant="contained" sx={{ height: 55, ml: 2 }} onClick={() => create()}>Create</Button>
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