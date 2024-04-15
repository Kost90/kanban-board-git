import { Card, CardBody, CardFooter, CardHeader, Text } from "@chakra-ui/react"
import { daysAgo } from "../../utils/IssuesSort"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function ColumnItem({ issues }: { issues: any }) {
  const daysAgoOpen = daysAgo(issues.created_at)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: issues.id,
    data: {
      type: "Issue",
      issues,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <Card
        cursor="pointer"
        w="100%"
        h="150px"
        ref={setNodeRef}
        style={style}
      ></Card>
    )
  }

  return (
    <Card
      cursor="pointer"
      w="100%"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
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
