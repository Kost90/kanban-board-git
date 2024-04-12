import { Container } from "@chakra-ui/react"
import Header from "./components/Header"
import HomeMainSection from "./components/HomeMainSection"

const App = () => {
  return (
    <Container maxW={["sm", "md", "xl", "2xl", "4xl", "8xl"]} mx="auto">
      <Header />
      <HomeMainSection/>
    </Container>
  )
}

export default App
