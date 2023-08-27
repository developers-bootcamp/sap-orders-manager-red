import { PALLETE } from '../config/config';
import styled from '@emotion/styled';
import {  TableCell, TableFooter, TableRow } from '@mui/material';
const TableRows = styled(TableRow)({
    border: "5px",
    borderLeftStyle: "solid",
    borderLeftColor: `${PALLETE.RED} !important`,
    padding: "0px!important",
    height: "10px!important",
    backgroundColor: "white!important",

})
const TableCells = styled(TableCell)({
    border: " 4px",
    backgroundColor: "rgb(240,240,240)!important",
    paddingTop: '3px!important',
    paddingBottom: '3px!important',
    paddingRight: '7px!important',
    paddingLeft: '7px!important', 
    borderBottom: '5px solid #FFFF!important',
    borderRight: '5px solid #FFFF!important',
    Padding:"0pxIimportant"
})
const Head = styled(TableCell)({
    fontWeight: 'bold !important', 
    paddingTop: '0px!important',
    paddingBottom: '0px!important',
    paddingRight: '7px!important',
    paddingLeft: '7px!important',
    height: "40px!important",
    color: "gray!important",
    display: "table-cell!important",
})

const AddButtons = styled(TableCell)({
    border: " 5px",
    backgroundColor: "rgb(240,240,240)!important",
    paddingTop: '0px!important',
    paddingBottom: '0px!important',
    paddingRight: '7px!important',
    paddingLeft: '7px!important',
     borderBottom: '5px solid #FFFF!important',
    borderRight: '5px solid #FFFF!important',
    Padding:"0pxIimportant"
})

const Footer = styled(TableFooter)({
    border: "5px",
    backgroundColor: "rgb(240,240,240)!important",
    paddingLeft: '7px!important', 
    borderBottom: '5px solid #FFFF!important',
    padding: "0px!important",
    height: "20px!important",
    width:"fullWidth!important",
    color:"black!important",
})
const Edit = styled(TableCell)({
    border: " 4px",
    backgroundColor: "rgb(240,240,240)!important",
    paddingTop: '3px!important',
    paddingBottom: '3px!important',
    paddingRight: '7px!important',
    paddingLeft: '7px!important', 
    borderBottom: '5px solid #FFFF!important',
    borderRight: '5px solid #FFFF!important',
    Padding:"0pxIimportant",
    width:"45px"
})
export { TableRows, TableCells, Head, AddButtons,Footer,Edit }