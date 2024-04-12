import { Heading } from "@chakra-ui/react"

function HeadingComponent({ text }: { text: string | null}) {
  return (
    <Heading as="h2" size={["sm", "md", "lg", "lg", "xl"]}>
      {text}
    </Heading>
  )
}

export default HeadingComponent
