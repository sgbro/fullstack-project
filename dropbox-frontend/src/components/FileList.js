import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFiles } from "../store/filesSlice";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const FileList = ({ onSelect }) => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.items);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return (
    <List>
      {files.map((f) => (
        <ListItem key={f.id} disablePadding>
          <ListItemButton onClick={() => onSelect(f)}>
            <ListItemText
              primary={f.originalFilename}
              secondary={f.uploadDate}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
export default FileList;
