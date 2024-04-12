export function CheckIfExistRepo(repo: any[], url: string) {
  const result = repo.find(el => el.url === url)
  if (result !== undefined) {
    return result
  } else {
    return url
  }
}

export function getOwnerRepoName(repoArr: any[], url: string | null) {
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
