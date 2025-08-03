import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFiles = createAsyncThunk("files/fetchFiles", async () => {
  const response = await axios.get("http://localhost:8080/api/files");
  return response.data;
});
export const uploadFile = createAsyncThunk("files/uploadFile", async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(
    "http://localhost:8080/api/files/upload",
    formData
  );
  return response.data;
});

const filesSlice = createSlice({
  name: "files",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});
export default filesSlice.reducer;
