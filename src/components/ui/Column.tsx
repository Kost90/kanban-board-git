import { Key } from "react"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ColumnItem from "./ColumnItem"
import { Flex, Stack } from "@chakra-ui/react"
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

// TODO:Need anotation for data prop
function Column({ data, name }: { data: any | null ; name: string }) {
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
      <Stack
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        spacing={3}
        bg="gray.200"
        p="20px"
        w="100%"
        ref={setNodeRef}
        style={style}
      ></Stack>
    )
  }

  return (
    <>
      <Flex sx={flexBoxStyle}>
        <HeadingComponent text={name} />
        <Stack
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          spacing={3}
          bg="gray.200"
          p="20px"
          w="100%"
        >
          {data.map((el: MapElParams, i: Key | null | undefined) => (
            <ColumnItem issues={el} key={i} />
          ))}
        </Stack>
      </Flex>
    </>
  )
}

export default Column
