import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { FetchRepiIssues } from "../../api/github-api"

type Issues = {
  url: string | null
  newIssues: any[]
}

// TODO:Make anotation for fetched object
export interface IRepoSliceState {
  currentUrl: string | null
  repos: any[]
  status: "idle" | "loading" | "failed"
  error: string | null
}

const initialState: IRepoSliceState = {
  currentUrl: null,
  repos: [],
  status: "idle",
  error: null,
}

export const repoSlice = createAppSlice({
  name: "repo",
  initialState,
  reducers: create => ({
    addUrl: create.reducer((state, action: PayloadAction<string>) => {
      state.currentUrl = action.payload
    }),
    editIssuesArr:create.reducer((state,action:PayloadAction<Issues>) => {
      const { url, newIssues } = action.payload;
      const result = state.repos.findIndex(el => el.url === url)
      state.repos[result].issues = newIssues
    }),
    getRepoAsync: create.asyncThunk(
      async (url: string, { rejectWithValue }) => {
        try {
          const response = await FetchRepiIssues(url)
          return response
        } catch (error: any) {
          return rejectWithValue(error.message)
        }
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.repos.push(action.payload)
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.error = action.payload as string
        },
      },
    ),
    setStatus: create.reducer(
      (state, action: PayloadAction<"idle" | "loading" | "failed">) => {
        state.status = action.payload
      },
    ),
  }),
  selectors: {
    selectUrl: repo => repo.currentUrl,
    selectRepo: repo => repo.repos,
    selectStatus: repo => repo.status,
    selectError: repo => repo.error,
  },
})

export const { addUrl, getRepoAsync, setStatus, editIssuesArr } = repoSlice.actions

export const { selectRepo, selectStatus, selectUrl, selectError } =
  repoSlice.selectors
