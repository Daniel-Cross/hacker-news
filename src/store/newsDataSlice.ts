import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REDUX_STATUS } from "../utils/constants";
import { randomiseNewsData } from "./actions";
import { NewsItem } from "./types";

interface NewsDataProps {
  error: string | null;
  data: NewsItem[];
  status: string;
}

const initialState: NewsDataProps = {
  error: null,
  data: [],
  status: REDUX_STATUS.IDLE,
};

export const getNewsStories = createAsyncThunk(
  "getNews/getNewsStories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );

      const data = await response.json();
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(data);
      }
      const result = await randomiseNewsData(data, 10);

      const stories = await Promise.all(
        result.map(async (id: number) => {
          const storyResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          return await storyResponse.json();
        })
      );

      return { stories };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const news = createSlice({
  name: "newsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsStories.pending, (state) => {
      state.status = REDUX_STATUS.LOADING;
    }),
      builder.addCase(getNewsStories.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.SUCCEEDED;
        state.data = action.payload.stories;
      }),
      builder.addCase(getNewsStories.rejected, (state, action) => {
        state.status = REDUX_STATUS.FAILED;
        state.error = action.error.message || "Error fetching data";
      });
  },
});

export const {} = news.actions;

export default news.reducer;
