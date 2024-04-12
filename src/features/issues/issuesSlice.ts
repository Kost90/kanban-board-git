import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { FetchRepiIssues } from "../../api/github-api"

// TODO:Make anotation for fetched object
type Issues = {
  name: string
  arrIssues: any[]
}

export interface IIssues {
  currentUrl: string | null
  issues: Issues[]
}

const initialState: IIssues[] = []

export const issuesSlice = createAppSlice({
  name: "issues",
  initialState,
  reducers: create => ({
    addIssues: create.reducer((state, action: PayloadAction<IIssues>) => {
      state.push(action.payload)
    }),
  }),
  selectors: {
    selectIssues: issues => issues,
  },
})

export const { addIssues } = issuesSlice.actions

export const { selectIssues } = issuesSlice.selectors
