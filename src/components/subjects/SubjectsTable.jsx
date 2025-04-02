import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SubjectsTable = ({ subjects, onEdit, onDelete }) => {
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleMenuClick = (event, id) => {
    setSelectedId(id);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedId(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Subject Name", flex: 1 },
    { field: "code", headerName: "Subject Code", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuClick(event, params.row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor) && selectedId === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                onEdit(params.row);
                handleMenuClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                onDelete(params.row.id);
                handleMenuClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box>
      <DataGrid rows={subjects} columns={columns} pageSize={5} checkboxSelection autoHeight />
    </Box>
  );
};

export default SubjectsTable;
