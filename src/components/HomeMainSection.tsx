import { Box, Spinner } from "@chakra-ui/react"
import { useEffect, useState, useMemo } from "react"
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

interface IRepos {
  url: string
  owner: string
  issues: any[]
  repoName: string
}

function HomeMainSection() {
  const currentUrl = useAppSelector(selectUrl)
  const repos = useAppSelector(selectRepo)
  const [repoData, setRepoData] = useState<any[] | IRepos[]>()
  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUrl !== null) {
      const url = CheckIfExistRepo(repos, currentUrl)
      if (typeof url === "string") {
        dispatch(getRepoAsync(url))
      } else {
        dispatch(setStatus("idle"))
        setRepoData([url])
      }
    }
  }, [currentUrl, repos])

  return (
    <main>
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
