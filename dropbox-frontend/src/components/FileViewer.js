import React from "react";
import { Button } from "@mui/material";

const FileViewer = ({ file }) => {
  if (!file) return null;

  const handleDownload = () => {
    window.location = `/api/files/${file.id}/download`;
  };

  return (
    <div>
      <h2>{file.originalFilename}</h2>
      <Button variant="contained" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
};
export default FileViewer;
