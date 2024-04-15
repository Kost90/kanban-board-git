import { Key, useMemo } from "react"
import { SortableContext } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ColumnItem from "./ColumnItem"
import { Box, Flex, Stack } from "@chakra-ui/react"
import HeadingComponent from "./HeadTitel"

type MapElParams = {
  issues: any[]
}

const flexBoxStyle = {
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "24px",
}

function Column({ data, name }: { data: any | null; name: string }) {
  // Id for Sorteble context
  const IssuesId = useMemo(() => data.map((el: any) => el.id), [data])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: name,
    data: {
      type: "Column",
      data,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        h="600px"
        bg="gray.100"
        borderRadius="10px"
        w={["320px", "400px", "480px"]}
      ></Box>
    )
  }

  return (
    <Flex sx={flexBoxStyle}>
      <HeadingComponent text={name} />
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        h="600px"
        bg="gray.100"
        borderRadius="10px"
        w={["320px", "400px", "480px"]}
      >
        <Stack
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          p="20px"
          w="100%"
          maxHeight="580px"
          overflowY="scroll"
          py="20px"
          sx={{ scrollbarWidth: "none" }}
        >
          <SortableContext items={IssuesId}>
            {data.map((el: MapElParams, i: Key | null | undefined) => (
              <ColumnItem issues={el} key={i} />
            ))}
          </SortableContext>
        </Stack>
      </Box>
    </Flex>
  )
}

export default Column
