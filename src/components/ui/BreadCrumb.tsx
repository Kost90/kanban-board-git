import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Breadcrumb, Link } from "@chakra-ui/react"
import { useAppSelector } from "../../app/hooks"
import {
  selectRepo,
  selectStatus,
  selectUrl,
} from "../../features/repos/reposSlice"
import { getOwnerRepoName } from "../../utils/IssuesSort"
import { useEffect, useState } from "react"

type Repo = {
  owner: string
  repoName: string
}

function BreadCrumb() {
  const [repo, setRepo] = useState<Repo | null>(null)
  const repos = useAppSelector(selectRepo)
  const url = useAppSelector(selectUrl)
  const status = useAppSelector(selectStatus)

  useEffect(() => {
    if (repos.length !== 0) {
      const repo = getOwnerRepoName(repos, url)
      if (repo !== null && repo !== undefined) {
        setRepo(repo)
      }
    }
  }, [repos, url])

  return (
    <Breadcrumb>
      {repo !== null && repo.owner !== undefined && status !== "failed" ? (
        <>
          <BreadCrumbItem
            text={repo.owner}
            href={`https://github.com/${repo.owner}`}
          />
          <ChevronRightIcon color={"gray.500"} />
          <BreadCrumbItem
            text={repo.repoName}
            href={`https://github.com/${repo.owner}/${repo.repoName}`}
          />
        </>
      ) : null}
    </Breadcrumb>
  )
}

type BreadCrumbItemProps = {
  text?: string
  href?: string
}

// Using Link from chakra, instead Breadcrumb link and item, because in my situation it didn't work
function BreadCrumbItem({ href, text }: BreadCrumbItemProps) {
  return (
    <Box>
      {href !== undefined ? (
        <Link href={href} target="blanc" color="blue.500">
          {text}
        </Link>
      ) : null}
    </Box>
  )
}

export default BreadCrumb
