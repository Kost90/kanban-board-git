import { IReposData } from "../app/types"

export function CheckIfExistRepo(repo: IReposData[], url: string) {
  const result = repo.find(el => el.url === url)
  if (result !== undefined) {
    return result
  } else {
    return url
  }
}

export function getOwnerRepoName(repoArr: IReposData[], url: string | null) {
  if (url !== null) {
    const result = repoArr.find(el => el.url === url)
    if (result !== undefined) {
      const repo = {
        owner: result.owner,
        repoName: result.repoName,
      }
      return repo
    }
  } else {
    return null
  }
}

export function daysAgo(taskOpenTime: string) {
  const openDate: any = new Date(taskOpenTime)
  const currentDate: any = new Date()
  const differenceMs = currentDate - openDate
  const daysAgo = Math.floor(differenceMs / (1000 * 60 * 60 * 24))
  return daysAgo
}

// Function for find the issue by passed to the parametrs id and return index of parent arr, index of children arr and element that containe the id
export function findElementById(issuesArray: any[], id: any) {
  for (let i = 0; i < issuesArray.length; i++) {
    const issue = issuesArray[i]
    const name = issuesArray[i].name

    if (Array.isArray(issue.issues)) {
      for (let j = 0; j < issue.issues.length; j++) {
        const element = issue.issues[j]

        if (element.id === id) {
          return { element, i, j, name }
        }
      }
    }
  }

  return null
}

// Function for updating main arrai with updated array with issues.
export function updateIssuesArrayByTagName(
  dataArray: any[],
  newName: string,
  newIssuesArray: any[],
) {
  const newArray = dataArray.map(obj => ({ ...obj }))

  for (let i = 0; i < newArray.length; i++) {
    const obj = newArray[i]

    if (obj.name === newName) {
      const updatedObj = { ...obj, issues: newIssuesArray }

      newArray[i] = updatedObj

      return newArray
    }
  }
  return false
}
