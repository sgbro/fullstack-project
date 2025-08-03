import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import FileViewer from "./components/FileViewer";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <Container>
      <Typography variant="h4">Mini Dropbox</Typography>
      <FileUpload />
      <FileList onSelect={setSelectedFile} />
      <FileViewer file={selectedFile} />
    </Container>
  );
}

export default App;
