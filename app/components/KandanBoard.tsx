"use client"

import { useState } from "react";
import PlusIcon from "./Icons/PlusIcon";
import { Column, Id } from "@/Types/Column";
import {DndContext} from '@dnd-kit/core';
import ColumnContainer from "./ColumnContainer";

const KandanBoard = () => {

    const [cols, setCols] = useState<Column[]>([])
    const [parent, setParent] = useState(null);

    const createNewCol = () => {
        const randomNumber = Math.floor(Math.random()*10000)
        const colToAdd: Column = {
            id: randomNumber,
            title: `Column ${cols.length + 1}`
        }

        setCols(prev => [...prev, colToAdd])

    }

    const onDragStart = (event) => {
        console.log(event)
    }

    const handleDragEnd = (event: { over: any; }) => {
        const {over} = event

        setParent(over ? over.id : null);
    }


    const removeColumn = (colId: Id) => {
        console.log(colId)
        const filteredCol = cols.filter( item => item.id !== colId)
        setCols(filteredCol)
    }


    return (
        <div className="m-auto flex flex-col">
        <div className="flex justify-between static items-center w-full m-10">
            <h2 className="text-lg font-semibold">Kanban Board Demo</h2>
         <div
         className='mr-20'
         >
         <button
            onClick={createNewCol}
            className="h-[60px] w-[350px] min-w-[350px] rounded-lg bg-mainBgColor p-4 border-2 ring-rose-400 hover:ring-2 border-colBgColor cursor-pointer flex items-center gap-1 mr-4"
          >
            <PlusIcon  />
            <span className="flex items-center">Add Column</span> 
          </button>
         </div>
        </div>
      <DndContext onDragEnd={handleDragEnd} onDragStart={onDragStart}>
        <div className="m-auto flex gap-4 overflow-x-auto">
          <div className="flex gap-4">
            {cols.map((column) => (
              <ColumnContainer key={column.id} removeColumn={removeColumn} column={column} />
            ))}
          </div>
        </div>
        </DndContext>
      </div>
      
    );
}

export default KandanBoard;