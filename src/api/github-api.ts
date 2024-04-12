import { Octokit } from "octokit"

export enum IssuesName {
  open = "Todo",
  assignee = "In Progress",
  closed = "Closed",
}

const octokit = new Octokit()

// Function for fetching issues from GithubAPI
export async function FetchRepiIssues(url: string) {
  const { owner, repo } = urlSpliter(url)
  try {
    const result = await octokit.request(
      "GET /repos/{owner}/{repo}/issues?state=all",
      {
        owner: owner,
        repo: repo,
        assignee: "*",
      },
    )

    if (result.status !== 200) {
      throw console.error("Can't fetch repos issues")
    }
    const { open, closed, assignee } = SortIssuesByState(result.data)

    const newRepo = {
      url: url,
      owner: owner,
      issues: [open, assignee, closed],
      repoName: repo,
    }

    return newRepo
  } catch (error) {
    throw new Error("Failed to fetch repository issues")
  }
}

// Function for split url string
function urlSpliter(url: string) {
  const urlParts = new URL(url)
  const pathParts = urlParts.pathname.split("/")

  const owner = pathParts[1]
  const repo = pathParts[2]

  return { owner, repo }
}

// Function for sorting issues by state
function SortIssuesByState(issues: any[]) {
  let open: any = {
    name: IssuesName.open,
    issues: [],
  }
  let closed: any = {
    name: IssuesName.closed,
    issues: [],
  }
  let assignee: any = {
    name: IssuesName.assignee,
    issues: [],
  }

  issues.forEach(el => {
    if (el.state === "open") {
      open.issues.push(el)
    } else if (el.state === "closed") {
      closed.issues.push(el)
    } else if (el.assignee) {
      assignee.issues.push(el)
    }
  })
  return { open, closed, assignee }
}
