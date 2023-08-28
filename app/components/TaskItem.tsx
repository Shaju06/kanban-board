import { Container } from '@/Types/Column';
import {useState} from 'react'

interface TaskProps {
    taskList: Container[]
    setTaskList: 
}

const TaskItem = (props: TaskProps) => {

    const {taskList, setTaskList} = props


    return (
        <>
    <div className="flex-grow p-4 overflow-y-auto">
    {taskList.length === 0 ? (
      <div className="text-center text-gray-600">List is empty. Add an item.</div>
    ) : (
        taskList.map((item) => (
        <div key={item.id} className="flex items-center mb-2">
          <input
            type="text"
            value={item.title}
            onChange={(e) => {
                setTaskList((prev) => [...prev])
            }}
            className="flex-grow bg-colBgColor h-20 rounded px-2 py-1 hover:border-rose-400 outline-none transition border border-transparent focus:border-rose-400"
          />
        </div>
      ))
    )}
  </div>
        </>
    );
}

export default TaskItem;