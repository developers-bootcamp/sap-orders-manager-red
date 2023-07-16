import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, TableHead } from '@mui/material';
import useStylesForTable from './GlobalTable.style';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { PALLETE } from '../config/config';


function createData(id: string, product: string, description: string) {
  return { id, product, description };
}

const rows = [
  createData('1', 'Cupcake', '305'),
  createData('2', 'Donut', '452'),
  createData('3', 'Eclair', '262'),
  createData('4', 'Frozen yoghurt', '159'),
  createData('5', 'Gingerbread', '356'),
  createData('6', 'Honeycomb', '408'),
  createData('7', 'Ice cream sandwich', '237'),
  createData('8', 'Jelly Bean', '375'),
  createData('9', 'KitKat', '518'),
  createData('10', 'Lollipop', '392'),
  createData('11', 'Marshmallow', '318'),
  createData('12', 'Nougat', '360'),
  createData('13', 'Oreo', '437'),
].sort((a, b) => (a.product < b.product ? -1 : 1));

export default function GlobalTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const classes = useStylesForTable(PALLETE.RED)

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <div>

        <Table sx={{ minWidth: 100 }} aria-label="custom pagination table">
          <TableHead style={{ height: '10px', fontStyle: "inherit" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" ,padding: '0'}}>product</TableCell>
              <TableCell style={{ fontWeight: "bold" ,padding: '0'}}>description</TableCell>
              <TableCell style={{ fontWeight: "bold" ,padding: '0'}}>Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (

             <TableRow key={row.id} style={{ height: "20px" }} className={classes.sideColor} >
                <TableCell style={{ padding: '0', borderBottom: '5px solid #ffff' }} component="th" scope="row">
                  {row.product}

                </TableCell>
                <TableCell style={{ padding: '0', borderBottom: '5px solid #ffff' }}>
                  {row.description}
                </TableCell>
                <TableCell style={{ padding: '0', borderBottom: '5px solid #ffff' }}><IconButton aria-label="add an alarm">
                  <EditIcon />
                </IconButton>
                </TableCell>
              </TableRow> 

            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>


            )}
          </TableBody>
          <TableFooter>
            <TableRow><TableCell style={{ width: 1000 }}><IconButton aria-label="add an alarm">

              <AddIcon />
            </IconButton>
              add product
            </TableCell>
              <TablePagination
                rowsPerPageOptions={[3, 5, 10, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>

        </Table>
      </div>

    </TableContainer>
  );
}