import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core"
import { Key, useMemo, useState } from "react"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ColumnItem from "./ColumnItem"
import { Flex, Stack } from "@chakra-ui/react"
import HeadingComponent from "./HeadTitel"
import { createPortal } from "react-dom"

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
  const [activeIssue, setActiveIssue] = useState<any>(null)
  const [newArray, setNewArray] = useState<any>([])

  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Issue") {
      setActiveIssue(e.active.data.current.id)
      return
    }
  }

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over) return
    const activeIssueid = active.id
    const overIssueId = over.id
    if (activeIssueid === overIssueId) return

    const activeColumnIndex = data.findIndex((el: any) => {
      console.log(el)
      el.id === activeIssueid
    })
    const overColumnIndex = data.findIndex((el: any) => el.id === overIssueId)
    const result = arrayMove(data, activeColumnIndex, overColumnIndex)
    setNewArray(result)
  }

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
        justifyContent="flex-start"
        spacing={3}
        bg="gray.200"
        p="20px"
        w="100%"
        height="300px"
        ref={setNodeRef}
        style={style}
      ></Stack>
    )
  }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
          bg="gray.200"
          p="20px"
          w="100%"
        >
          <SortableContext items={IssuesId}>
            {data.map((el: MapElParams, i: Key | null | undefined) => (
              <ColumnItem issues={el} key={i} />
            ))}
          </SortableContext>
        </Stack>
      </Flex>
      {createPortal(
        <DragOverlay>
          {activeIssue && <ColumnItem issues={activeIssue} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}

export default Column
