import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable"
import { Box, Grid, Heading } from "@chakra-ui/react"
import { Key, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import Column from "./Column"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  editIssuesArr,
  selectRepo,
  selectUrl,
} from "../../features/repos/reposSlice"

type MapElParams = {
  name: string
  issues: any[]
}

function ColumnsContainer({ data }: { data: any }) {
  const currentUrl = useAppSelector(selectUrl)
  const dispatch = useAppDispatch()
  const columnsId = useMemo(() => data.map((col: any) => col.name), [data])
  const [activeCol, setActiveClo] = useState<any>(null)
  const [activeName, setActiveName] = useState<any>(null)
  const [newArray, setNewArray] = useState<any>([])

  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Column") {
      setActiveClo(e.active.data.current.column)
      setActiveName(e.active.id)
      return
    }
  }

  function onDragEnd(e: DragEndEvent) {
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

  useEffect(() => {
    if (newArray.length !== 0 && newArray !== undefined) {
      dispatch(editIssuesArr({ url: currentUrl, newIssues: newArray }))
    }
  }, [activeCol, newArray])

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]} gap={6}>
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
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}

export default ColumnsContainer
