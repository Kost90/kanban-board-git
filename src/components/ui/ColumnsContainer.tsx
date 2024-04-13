import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { Box, Grid, Heading } from "@chakra-ui/react"
import { Key, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import Column from "./Column"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { editIssuesArr, selectUrl } from "../../features/repos/reposSlice"
import ColumnItem from "./ColumnItem"

type MapElParams = {
  name: string
  issues: any[]
}

function ColumnsContainer({ data }: { data: any }) {
  const currentUrl = useAppSelector(selectUrl)
  const dispatch = useAppDispatch()

  // Id for Sorteble context for Columns
  const columnsId = useMemo(() => data.map((col: any) => col.name), [data])

  // State for columns
  const [activeCol, setActiveClo] = useState<any>(null)
  const [activeName, setActiveName] = useState<any>(null)
  const [newArray, setNewArray] = useState<any>([])

  // State for issues
  const [activeIssue, setActiveIssue] = useState<any>(null)
  const [newArrayIssues, setNewArrayIssues] = useState<any>([])

  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Column") {
      setActiveClo(e.active.data.current.column)
      setActiveName(e.active.id)
      return
    }

    if (e.active.data.current?.type === "Issue") {
      setActiveIssue(e.active.data.current.issues.id)
      return
    }
  }

  // Drang End function
  function onDragEnd(e: DragEndEvent) {
    setActiveClo(null)
    setActiveIssue(null)

    const { active, over } = e
    if (!over) return
    const activeColid = active.id
    const overColumnId = over.id

    if (activeColid === overColumnId) return
    const activeColumnIndex = data.findIndex(
      (col: any) => col.name === activeColid,
    )
    const overColumnIndex = data.findIndex(
      (col: any) => col.name === overColumnId,
    )
    const result = arrayMove(data, activeColumnIndex, overColumnIndex)
    setNewArray(result)
  }

  // Drag Over Function
  function onDragOver(e: DragOverEvent) {
    const { active, over } = e
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveIssue = active.data.current?.type === "Issue"
    const isOverIssue = over.data.current?.type === "Issue"

    if (!isActiveIssue) return

    if (isActiveIssue && isOverIssue) {
      const activeIssueIndex = data.issues.findIndex(
        (col: any) => col.id === isActiveIssue,
      )
      const overIssueIndex = data.issues.findIndex(
        (col: any) => col.id === isOverIssue,
      )

      const result = arrayMove(
        data.issues[activeIssueIndex],
        activeIssueIndex,
        overIssueIndex,
      )
      setNewArrayIssues(result)
    }
  }

  useEffect(() => {
    if (newArray.length !== 0 && newArray !== undefined) {
      dispatch(editIssuesArr({ url: currentUrl, newIssues: newArray }))
    }
  }, [activeCol, newArray])

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
        gap={6}
        position="relative"
      >
        <SortableContext items={columnsId}>
          <>
            {data === null && data === undefined ? (
              <Box>
                <Heading>Don't have any data</Heading>
              </Box>
            ) : (
              <>
                {data.map((el: MapElParams, i: Key | null | undefined) => (
                  <Column data={el.issues} name={el.name} key={i} />
                ))}
              </>
            )}
          </>
        </SortableContext>
      </Grid>
      {createPortal(
        <DragOverlay>
          {activeCol && <Column data={activeCol.issues} name={activeName} />}
          {activeIssue && <ColumnItem issues={activeIssue} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}

export default ColumnsContainer
