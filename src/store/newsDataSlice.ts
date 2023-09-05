import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { randomiseNewsData } from "./actions";
import { NewsItemProps, REDUX_STATUS } from "./types";

interface NewsDataProps {
  error: string | null;
  data: NewsItemProps[];
  status: string;
}

const initialState: NewsDataProps = {
  error: null,
  data: [
    {
      by: "",
      descendants: 0,
      id: 0,
      kids: [],
      score: 0,
      time: 0,
      title: "",
      type: "",
      url: "",
      karma: 0,
    },
  ],
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

      const users = await Promise.all(
        stories.map(async (story: NewsItemProps) => {
          const userResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/user/${story.by}.json`
          );
          return await userResponse.json();
        })
      );

      const usersMap = new Map(users.map((user) => [user.id, user]));
      const mergedPosts = stories.map((story) => ({
        ...story,
        karma: usersMap.get(story.by)?.karma || 0,
      }));

      return { mergedPosts };
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
      return state;
    }),
      builder.addCase(getNewsStories.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.SUCCEEDED;
        const sortedStories = action.payload.mergedPosts.sort(
          (a: NewsItemProps, b: NewsItemProps) => b.score - a.score
        );
        state.data = sortedStories;
        return state;
      }),
      builder.addCase(getNewsStories.rejected, (state, action) => {
        state.status = REDUX_STATUS.FAILED;
        state.error = action.error.message || "Error fetching data";
        return state;
      });
  },
});

export const {} = news.actions;

export default news.reducer;
