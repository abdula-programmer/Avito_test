import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../api";

const getIdsTopNews = async () => {
  const res = await axios.get(`${API}/v0/newstories.json?print=pretty`);
  const sliceData = res.data.slice(0, 100);
  return sliceData;
};

export const getNews = createAsyncThunk("news/getNews", async () => {
  const ids = await getIdsTopNews();
  const res = await Promise.all(
    ids.map(async (id) => {
      const response = await axios.get(`${API}/v0/item/${id}.json?print=pretty`);
      return response.data;
    })
  );
  return res;
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Не удалось загрузить данные";
      });
  },
});

export default newsSlice.reducer;
