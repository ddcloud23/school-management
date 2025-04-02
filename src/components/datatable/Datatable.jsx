import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, Menu, MenuItem } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Datatable = ({data, setUsers}) => {
  const [open, setOpen] = useState(false); // State for modal visibility
  const [menuEle, setMenuEle] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleMenuClick = (event, id) => {
    setDeleteId(id);
    setMenuEle(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuEle(null);
    setDeleteId(null);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    console.log(deleteId);
    setUsers(data.filter((item) => item.id !== deleteId));
    setOpen(false);
    setDeleteId(null);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <IconButton onClick={(event) => handleMenuClick(event, params.row.id)}>
              <MoreVertIcon />
            </IconButton>

            <Menu 
              anchorEl={menuEle} 
              open={Boolean(menuEle) && deleteId == params.row.id}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            >
              <MenuItem>Edit</MenuItem>
              <MenuItem onClick={() => handleClickOpen(params.row.id)}>Delete</MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New User
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{
          sx: {
            maxWidth: "500px", 
            minHeight: "200px", 
            display: "flex",
            minWidth: "400px",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center"
          }
        }}
      >
        <DialogContent>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            mb: "20px"
          }}>
            <ErrorOutlineIcon sx={{ color: "#ffcc00", fontSize: 50 }} />
          </Box>
          <p>Are you sure you want to delete this user?</p>
        </DialogContent>
        <DialogActions sx={{ pb: 4, justifyContent: "center", gap: "20px" }}>
          <Button onClick={handleClose} sx={{ backgroundColor: "#d9d9d9", color: "#333" }}>
            No, Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Datatable;