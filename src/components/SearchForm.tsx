import SearchInput from "./ui/SearchInput"
import { Button, Flex, Spacer } from "@chakra-ui/react"
import { useAppDispatch } from "../app/hooks"
import { addUrl } from "../features/repos/reposSlice"

function SearchForm() {
  const dispatch = useAppDispatch()
  const handelSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const url = formData.get("url") as string
    dispatch(addUrl(url))
    e.currentTarget.reset()
  }
  return (
    <form onSubmit={handelSubmit}>
      <Flex flexDirection={["row"]} alignItems={"center"} gap={"10px"}>
        <SearchInput />
        <Spacer />
        <Button
          type="submit"
          fontSize={["smaller", "small", "medium"]}
          colorScheme="teal"
        >
          Load issues
        </Button>
      </Flex>
    </form>
  )
}

export default SearchForm
