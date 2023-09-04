import {useMemo} from 'react'
import { Container, Id } from "@/Types/Column"
import {useSortable} from '@dnd-kit/sortable';
import DeleteIcon from "./Icons/DeleteIcon"
import PlusIcon from "./Icons/PlusIcon"
import {CSS} from '@dnd-kit/utilities';
import TaskItem from "./TaskItem";
import { v4 as uuidv4 } from 'uuid';
import { SortableContext,verticalListSortingStrategy,  arrayMove } from "@dnd-kit/sortable";
interface Props  {
  container: Container
   removeColumn: (colId: Id) => void
   setContainers: any
}

const ColumnContainer = (props: Props) => {
const {container, removeColumn, setContainers} = props
const tasksId = useMemo(() => container.taskItems.map((i) => i.id), [container])

const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
} = useSortable({
  id: container.id,
  data: {
    type: 'Container',
    container
  }
})

const addItem = () => {
  setContainers((prev: Container[]) => {
    const cont = prev.find((item) => item.id === container.id);
    if (!cont) return;
    cont.taskItems.push({
      id: uuidv4(),
      title: '',
    });
    return [...prev]
  })

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
      {container.title}
    </div>
    <button
      onClick={() => removeColumn(container.id)}
      className="stroke-gray-500 hover:stroke-white rounded px-1 py-2 hover:bg-colBgColor"
    >
      <DeleteIcon />
    </button>
  </div>

  {/* Content */}
  <div className="flex-grow p-4 overflow-y-auto overflow-x-hidden">
  <SortableContext items={tasksId} strategy={verticalListSortingStrategy} id={`${container.id}-tasks`} >
    {
      container.taskItems.length === 0 ?
      
      <div className="text-center text-gray-600">Empty task</div> : (
       
      container.taskItems.map((task, index) => (
          <TaskItem 
          key={task.id}
          taskId={task.id} 
          container={container} 
          setContainers={setContainers} 
          />
        ))
      )
    }
      </SortableContext>   
  </div>

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