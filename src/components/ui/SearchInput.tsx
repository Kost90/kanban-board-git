import { Input } from "@chakra-ui/react"

function SearchInput() {
  return (
    <Input placeholder="Enter repo url" name="url" my="8px" type="text" required/>
  )
}

export default SearchInput
