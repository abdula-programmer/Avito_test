import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../api";

export const getActiveNews = createAsyncThunk(
  "activeNewsSlice/news",
  async (id) => {
    const res = await axios.get(`${API}v0/item/${id}.json?print=pretty`);
    return res.data;
  }
);


const activeNewslice = createSlice({
  name: "activeNewsSlice",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearNewsState: (state) => {
      state.data = {};
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getActiveNews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getActiveNews.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getActiveNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Не удалось загрузить данные"
    });
  },
});

export const {clearNewsState} = activeNewslice.actions;

export default activeNewslice.reducer;
