import { useState } from "react"
import { Column, Id } from "@/Types/Column"
import DeleteIcon from "./Icons/DeleteIcon"
import PlusIcon from "./Icons/PlusIcon"

interface Props  {
   column: Column
   removeColumn: (colId: Id) => void
}


const ColumnContainer = (props: Props) => {
const {column, removeColumn} = props
const [taskList, setTaskList] = useState<Column[]>([{id:1, title: 'eeee'}])


const addItem = () => {

}


return (
    <div className="flex flex-col w-[350px] h-[500px] max-h-[500px] rounded-md bg-mainBgColor">
  <div className="flex justify-between items-center bg-mainBgColor h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-colBgColor border-4">
    <div className="flex gap-2">
      <div className="flex justify-center items-center px-2 py-1 text-sm rounded-full">
        0
      </div>
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
  <div className="flex-grow p-4 overflow-y-auto">
    {taskList.length === 0 ? (
      <div className="text-center text-gray-600">List is empty. Add an item.</div>
    ) : (
        taskList.map((item) => (
        <div key={item.id} className="flex items-center mb-2">
          <input
            type="text"
            value={item.title}
            // onChange={(e) => {
            //     setTaskList((prev) => [...prev])
            // }}
            className="flex-grow bg-colBgColor h-20 rounded px-2 py-1 hover:border-rose-400 outline-none transition border border-transparent focus:border-rose-400"
          />
        </div>
      ))
    )}
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