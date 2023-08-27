import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Autocomplete, IconButton, TableHead, TextField } from '@mui/material';
import IPropsToGlobalTable from '../interfaces/IPropsToGlobalModel';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { AddButtons, Head, TableCells, TableRows, Footer, Edit } from './GlobalTable.style'
import AreYouShore from './areYouShore';

export default function GlobalTable(props: IPropsToGlobalTable) {
  const rows = props.rows;
  const [newRowValues, setNewRowValues] = React.useState<any>({});
  const [editRowValues, setEditRowValues] = React.useState<any>({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [add, setAdd] = React.useState(false);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);

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
  const deleteItem = async (id: string) => {
    await props.delete(id)
  }
  const openAdd = () => { setAdd(true) };
  const closeAdd = () => { setAdd(false) };
  const handleAdd = async () => {
    const newObject = {
      ...newRowValues
    };
    try {
      await props.add(newObject);
      setNewRowValues({});
      closeAdd();
    } catch (error) {
      console.error('Error saving new object:', error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRowValues((prevValues: any) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAutocompleteChange = (fieldName: string, selectedValue: any) => {
    setNewRowValues((prevValues: any) => ({
      ...prevValues,
      [fieldName]: selectedValue,
    }));
  };
  const closeEdit = () => { setEditingRowId(null); }
  const handleSaveClick = async (rowId: string) => {
    const newObject = {
      id: rowId,
      ...editRowValues,
    };
    try {
      await props.edit(newObject);
      closeEdit();
    } catch (error) {
      console.error('Error saving new object:', error);
    }
  };
  const handleEditClick = (rowId: string) => {
    setEditingRowId(rowId);
    const row = rows.find((row: any) => row.id === rowId);
    setEditRowValues(row);
  };
  const handleInputChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditRowValues((prevValues: any) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAutocompleteChangeEdit = (fieldName: string, selectedValue: any) => {
    setEditRowValues((prevValues: any) => ({
      ...prevValues,
      [fieldName]: selectedValue,
    }));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="custom pagination table">
        {/* Head */}
        <TableHead style={{ height: '10px', fontStyle: "inherit" }}>
          <TableRow>
            {props.head.map((e: any) => <Head>{e.name}</Head>)}
            <Head>Edit</Head>
            <Head>Delete</Head>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: any) => (
            <TableRows key={row.id} style={{ height: "20px" }}>
              {Object.keys(row).map((key, indexs) => (
                key !== "id" ? (
                  <TableCells style={{ padding: "0px!important" }} key={key} component="th" scope="row">
                    {editingRowId === row.id ? (
                      console.log({ editRowValues }),

                      <TableCells key={key}>
                        {props.head[indexs - 1].type === "text" ?
                          <TextField
                            size="small"
                            name={props.head[indexs - 1].name}
                            value={editRowValues[props.head[indexs - 1].name] || editRowValues[key]}
                            onChange={handleInputChangeEdit}
                          /> : props.head[indexs - 1].type === "number" ?
                            <TextField
                              defaultValue={key}
                              size="small"
                              type='number'
                              name={props.head[indexs - 1].name}
                              value={editRowValues[props.head[indexs - 1].name] || editRowValues[key]}
                              onChange={handleInputChangeEdit}
                            /> : props.head[indexs - 1].type === 'autocompletet' && props.head[indexs - 1].options ? (
                              <Autocomplete
                                size="small"
                                options={props.head[indexs - 1].options}
                                getOptionLabel={(option: any) => option.name}
                                value={editRowValues[props.head[indexs - 1].name]}
                                onChange={(_, newValue) =>
                                  handleAutocompleteChangeEdit(props.head[indexs - 1].name, newValue)
                                }
                                renderInput={(params) => <TextField {...params} />}
                              />
                            ) : ""}
                      </TableCells>
                    ) : (
                      row[key]
                    )}
                  </TableCells>
                ) : (
                  ""
                )
              ))}
              {editingRowId === row.id ? (
                <Edit>
                  <IconButton onClick={() => handleSaveClick(row.id)}>
                    <CheckIcon />
                  </IconButton>
                </Edit>
              ) : (
                <Edit>
                  <IconButton onClick={() => handleEditClick(row.id)}>
                    <EditIcon />
                  </IconButton>
                </Edit>
              )}
              {editingRowId === row.id ? (
                <Edit>
                  <IconButton onClick={() => closeEdit()}>
                    <CloseIcon/>
                  </IconButton>
                </Edit>
              ) : (
                <Edit><IconButton onClick={() => deleteItem(row.id)}>
                  <DeleteIcon />
                </IconButton></Edit>
              )}
            </TableRows>
          ))}
          {add ? <TableRows>
            {props.head.map((e: any) =>
              <TableCells key={e.id}>
                {e.type === "text" ?
                  <TextField
                    size="small"
                    name={e.name}
                    value={newRowValues[e.name] || ''}
                    onChange={handleInputChange}
                  /> : e.type === "number" ? <TextField
                    size="small"
                    type='number'
                    name={e.name}
                    value={newRowValues[e.name] || ''}
                    onChange={handleInputChange}
                  /> : e.type === 'autocompletet' && e.options ? (
                    <Autocomplete
                      size="small"
                      options={e.options}
                      getOptionLabel={(option: any) => option.name}
                      value={newRowValues[e.name] || null}
                      onChange={(_, newValue) =>
                        handleAutocompleteChange(e.name, newValue)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  ) : ""}
              </TableCells>
            )}
            <TableCells>
              <IconButton onClick={handleAdd}><CheckIcon /></IconButton>
            </TableCells>
            <TableCells>
              <IconButton onClick={closeAdd}><CloseIcon /></IconButton>
            </TableCells>
          </TableRows>
            : ""}
          {emptyRows > 0 && (
            <TableRows >
              <TableCells colSpan={6} />
            </TableRows>
          )}
        </TableBody>

        {/* Footer */}
        <Footer>
          <TableRow>
            <AddButtons>
              <IconButton aria-label="add an alarm" onClick={openAdd}>
                <AddIcon />
              </IconButton>
              {`add ${props.whatToAdd}`}
            </AddButtons>
            <TablePagination
              rowsPerPageOptions={[4, 8, 10, { label: 'All', value: -1 }]}
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
        </Footer>
      </Table>
    </TableContainer >
  );
}