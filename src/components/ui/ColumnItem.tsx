import { Card, CardBody, CardFooter, CardHeader, Text } from "@chakra-ui/react"
import { daysAgo } from "../../utils/IssuesSort"


// TODO:Created anotations for props
function ColumnItem({ issues }: { issues: any }) {
  const daysAgoOpen = daysAgo(issues.created_at)
  return (
    <Card cursor="pointer" minW={"100%"}>
      <CardHeader>
        <Text fontSize="medium" fontWeight="bold">
          {issues.title}
        </Text>
      </CardHeader>
      <CardBody>
        <Text fontSize="small" color="gray.500">
          {`#${issues.number} opened ${daysAgoOpen} days ago`}
        </Text>
      </CardBody>
      <CardFooter>
        <Text fontSize="small" color="gray.400">
          {`Admin | Comments: ${issues.comments}`}
        </Text>
      </CardFooter>
    </Card>
  )
}

export default ColumnItem
