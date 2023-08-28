import { useState } from "react"
import { Container, Id } from "@/Types/Column"
import {useSortable} from '@dnd-kit/sortable';
import DeleteIcon from "./Icons/DeleteIcon"
import PlusIcon from "./Icons/PlusIcon"
import {CSS} from '@dnd-kit/utilities';
import TaskItem from "./TaskItem";
interface Props  {
   column: Container
   removeColumn: (colId: Id) => void
}


const ColumnContainer = (props: Props) => {
const {column, removeColumn} = props
const [taskList, setTaskList] = useState<Container[]>([{id:1, title: 'eeee'}])

const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
} = useSortable({
  id: column.id,
  data: {
    type: 'Container',
    column
  }
})

const addItem = () => {

}

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
};


return (
    <div
    ref={setNodeRef}
    style={style}
    className="flex flex-col w-[350px] h-[500px] max-h-[500px] rounded-md bg-mainBgColor">
  <div
 {...attributes}
 {...listeners} 
  className="flex justify-between items-center bg-mainBgColor h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-colBgColor border-4">
    <div className="flex gap-2">
      {column.title}
    </div>
    <button
      onClick={() => removeColumn(column.id)}
      className="stroke-gray-500 hover:stroke-white rounded px-1 py-2 hover:bg-colBgColor"
    >
      <DeleteIcon />
    </button>
  </div>

  {/* Content */}
<TaskItem />

  {/* Footer */}
  <div className="p-1 rounded-b-md">
    <button
      onClick={addItem}
      className="w-full text-white rounded px-2 py-3 hover:bg-colBgColor flex items-center gap-2"
    >
      <PlusIcon  />
      Add Item
    </button>
  </div>
</div>

)
}


export default ColumnContainer