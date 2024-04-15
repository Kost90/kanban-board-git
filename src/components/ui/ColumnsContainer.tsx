import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { Box, Grid, Heading } from "@chakra-ui/react"
import { Key, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import Column from "./Column"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  editIssuesArr,
  editIssuesOrder,
  selectUrl,
} from "../../features/repos/reposSlice"
import ColumnItem from "./ColumnItem"
import {
  findElementById,
  updateIssuesArrayByTagName,
} from "../../utils/IssuesSort"

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
  const [name, setName] = useState<string>("")
  const [newArrayIssues, setNewArrayIssues] = useState<any>([])

  // Function for start dragable
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

    if (e.active.data.current?.type === "Column") {
      const activeColumnIndex = data.findIndex(
        (col: any) => col.name === activeColid,
      )
      const overColumnIndex = data.findIndex(
        (col: any) => col.name === overColumnId,
      )
      const result = arrayMove(data, activeColumnIndex, overColumnIndex)
      setNewArray(result)
    }

    // Logic for end of dragable Issues and save it to the state
    if (e.active.data.current?.type === "Issue") {
      const issueArr = data.filter((el: any) => {
        return e.active.data.current?.sortable.items.length === el.issues.length
      })

      // Found index of parent arr, children arr and name of column where Issue is dragable
      const activeIssueIndex = findElementById(issueArr, activeColid)
      const overIssuesIndex = findElementById(issueArr, overColumnId)

      // Save index and name of column to the constans
      const parentArrayIndex = activeIssueIndex?.i
      const ActiveIndexchldArr = activeIssueIndex?.j as number
      const OverIndexchldArr = overIssuesIndex?.j as number
      const columnName = activeIssueIndex?.name as string

      // Change array of special issues
      const result = arrayMove(
        issueArr[parentArrayIndex as number].issues,
        ActiveIndexchldArr,
        OverIndexchldArr,
      )

      // Updating parent Array with updated array with issues.
      const newArrOfIssues = updateIssuesArrayByTagName(
        data,
        columnName,
        result,
      )

      setName(columnName)
      setNewArrayIssues(newArrOfIssues)
    }
  }

  // Update Redux store by dragable column and issues in column
  useEffect(() => {
    if (newArray.length !== 0 && newArray !== undefined) {
      dispatch(editIssuesArr({ url: currentUrl, newIssues: newArray }))
    } else if (newArrayIssues.length !== 0 && newArrayIssues !== undefined) {
      dispatch(
        editIssuesOrder({
          url: currentUrl,
          newIssues: newArrayIssues,
          name: name,
        }),
      )
    }
  }, [activeCol, newArray, newArrayIssues])

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
