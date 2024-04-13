import { Box, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  getRepoAsync,
  selectError,
  selectRepo,
  selectStatus,
  selectUrl,
  setStatus,
} from "../features/repos/reposSlice"
import { CheckIfExistRepo } from "../utils/IssuesSort"
import HeadingComponent from "./ui/HeadTitel"
import ColumnsContainer from "./ui/ColumnsContainer"
import { IReposData } from "../app/types"

function HomeMainSection() {
  const currentUrl = useAppSelector(selectUrl)
  const repos = useAppSelector(selectRepo)
  const [repoData, setRepoData] = useState<IReposData[]>()
  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUrl !== null) {
      // Check by url if repository with issues was fetched before and added to the store
      const url: string | IReposData = CheckIfExistRepo(repos, currentUrl)
      if (typeof url === "string") {
        dispatch(getRepoAsync(url))
      } else {
        dispatch(setStatus("idle"))
        setRepoData([url])
      }
    }
  }, [currentUrl, repos])

  return (
    <main data-testid="home-main-section-component">
      <Box my={"24px"} mx={"auto"}>
        {status === "loading" ? (
          <Spinner mx={"auto"} size={["sm", "md", "lg", "xl"]} />
        ) : null}
        {status === "failed" ? <HeadingComponent text={error} /> : null}
        {currentUrl !== null && status !== "loading" && status !== "failed" ? (
          <>
            {repoData !== undefined
              ? repoData.map((el, i) => (
                  <ColumnsContainer data={el.issues} key={i} />
                ))
              : repos.map((el, i) => (
                  <ColumnsContainer data={el.issues} key={i} />
                ))}
          </>
        ) : null}
      </Box>
    </main>
  )
}

export default HomeMainSection
