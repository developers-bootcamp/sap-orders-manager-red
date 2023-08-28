import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
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

export default function GlobalTable(props: IPropsToGlobalTable) {
  const rows = props.rows;
  const [newRowValues, setNewRowValues] = React.useState<any>({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
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
  const deleteItem = async (id: string) => { console.log(id); await props.delete(id) }
  const openAdd = () => { setAdd(true) };
  const closeAdd = () => { setAdd(false) };
  const handleAdd = async () => {
    const newObject = {  
       ...newRowValues,
    };
    // console.log(newRowValues);
    try {
      console.log(newObject)
      await props.add(newObject);
      // props.rows = [...props.rows,newObject]
      closeAdd();
    } catch (error) {
      console.error('Error saving new object:', error);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRowValues((prevValues:any) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAutocompleteChange = (fieldName: string, selectedValue: any) => {
    setNewRowValues((prevValues:any) => ({
      ...prevValues,
      [fieldName]: selectedValue,
    }));
  };

  const closeEdit=()=>{ setEditingRowId(null);}
  const handleSaveClick = async(rowId: string) => { 

    const newObject = {  
      id:rowId,
      ...newRowValues,
   };  
   try {
     console.log({newObject});
     
    await props.edit(rowId,newObject);
    // props.rows = [...props.rows,newObject]
    closeEdit();
  } catch (error) {
    console.error('Error saving new object:', error);
  }
  };
  const handleEditClick = (rowId: string) => {
    setEditingRowId(rowId);
  };
  
  const handleInputChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        fieldName: string
  ) => {
    setNewRowValues((prevValues: any) => ({
      ...prevValues,
      [fieldName]: e.target.value,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <div>
        <Table sx={{ minWidth: 100 }} aria-label="custom pagination table">
          {/* Head */}
          <TableHead style={{ height: '10px', fontStyle: "inherit" }}>
            <TableRow>
              {props.head.map((e: any) => <TableCell>{e.name}</TableCell>)}
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>


          {/* Body */}
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row: any) => (
              <TableRow key={row.id} style={{ height: "20px" }}>
              {Object.keys(row).map((key) => (
                key !== "id" ? (
                  <TableCell key={key} component="th" scope="row">
                    {editingRowId === row.id ? (
                      <TextField
                        value={newRowValues[key] || row[key]}
                        onChange={(e) => handleInputChangeEdit( e,key)}
                        size="small"
                      />
                    ) : (
                      row[key]
                    )}
                  </TableCell>
                ) : (
                  ""
                )
              ))}
              <TableCell>
                {editingRowId === row.id ? (
                  <IconButton onClick={() => handleSaveClick(row.id)}>
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleEditClick(row.id)}>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                {editingRowId === row.id ? (
                  <IconButton onClick={() => closeEdit()}>
                    <CloseIcon />
                  </IconButton>
                ) : (
                <IconButton onClick={() => deleteItem(row.id)}>
                  <DeleteIcon />
                </IconButton>)}
              </TableCell>
            </TableRow>

            ))}
            {add ? <TableRow>
                {props.head.map((e: any) =>
                <TableCell key={e.id}>
                  {e.type === "text" ?  
                  <TextField
                    size="small"
                    name={e.name} 
                    value={newRowValues[e.name] || ''}
                    onChange={handleInputChange}
                  />: e.type === "number" ? <TextField
                  size="small"
                  type='number'
                  name={e.name} 
                  value={newRowValues[e.name] || ''}
                  onChange={handleInputChange}
                />: e.type === 'autocompletet' && e.options ? (
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
                )  : ""}
                </TableCell>
              )}
                  <TableCell>
                    <IconButton onClick={handleAdd}><CheckIcon /></IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={closeAdd}><CloseIcon /></IconButton>
                  </TableCell>
            </TableRow>
              : ""}
            {emptyRows > 0 && (
              <TableRow >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          {/* Footer */}
          <TableFooter>
            <TableRow>
              <TableCell>
                <IconButton aria-label="add an alarm" onClick={openAdd}>
                  <AddIcon />
                </IconButton>
                {`add ${props.whatToAdd}`}
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