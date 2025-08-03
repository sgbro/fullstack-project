import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../store/filesSlice";
import { Button } from "@mui/material";

const FileUpload = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();

  const handleUpload = () => {
    const file = fileRef.current.files[0];
    if (file) {
      const allowedTypes = [
        "text/plain",
        "image/jpeg",
        "image/png",
        "application/json",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Unsupported file type.");
        return;
      }
      dispatch(uploadFile(file));
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span" onClick={handleUpload}>
          Upload File
        </Button>
        <input
          type="file"
          id="file-upload"
          ref={fileRef}
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </label>
    </>
  );
};
export default FileUpload;
