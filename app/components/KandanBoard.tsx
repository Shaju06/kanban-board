"use client"

import { useState, useMemo, useEffect } from "react";
import PlusIcon from "./Icons/PlusIcon";
import { Container, Id } from "@/Types/Column";
import {DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import ColumnContainer from "./ColumnContainer";
import Modal from "./Modal";

const KandanBoard = () => {

    const [cols, setCols] = useState<Container[]>([])
    const [openModal, setOpenModal] = useState(false);
    const colsId = useMemo(()=> cols.map((item)=> item.id),[cols])

    const sensors = useSensors(useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      }
    }))

    const createNewCol = (enteredVal: string) => {
        const randomNumber = Math.floor(Math.random()*10000)
        const colToAdd: Container = {
            id: randomNumber,
            title: enteredVal
        }

        setCols(prev => [...prev, colToAdd])

    }

    const onDragStart = (event: DragStartEvent) => {
        // console.log(event)
    }

    const onModalClose = (value: string) => {
      value !== '' ?  createNewCol(value) : null
      setOpenModal(false)
    }

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;
  
      const activeId = active.id;
      const overId = over.id;
  
      if (activeId === overId) return;

      const isActiveAColumn = active.data.current?.type === "Container";
      if (!isActiveAColumn) return;
  
    
      setCols((columns) => {
        const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
  
        const overColumnIndex = columns.findIndex((col) => col.id === overId);
  
        return arrayMove(cols, activeColumnIndex, overColumnIndex);
      });
        
    }


    const removeColumn = (colId: Id) => {
        console.log(colId)
        const filteredCol = cols.filter( item => item.id !== colId)
        setCols(filteredCol)
    }

    useEffect(() => {
      if(openModal) {
        document.body.classList.add('modal-open');

      } else {
        document.body.classList.remove('modal-open');

      }
    },[openModal])


    return (
        <div className="m-auto flex flex-col">
        <div className="flex justify-between static items-center w-full m-10">
            <h2 className="text-lg font-semibold">Kanban Board Demo</h2>
         <div
         className='mr-20'
         >
         <button
            onClick={() => setOpenModal(true)}
            className="h-[60px] w-[350px] min-w-[350px] rounded-lg bg-mainBgColor p-4 border-2 ring-rose-400 hover:ring-2 border-colBgColor cursor-pointer flex items-center gap-1 mr-4"
          >
            <PlusIcon  />
            <span className="flex items-center">Add Column</span> 
          </button>
         </div>
        </div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={onDragStart}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={colsId}>
            {cols.map((column) => (
              <ColumnContainer key={column.id} removeColumn={removeColumn} column={column} />
            ))}
            </SortableContext>
          </div>
        </div>
        </DndContext>
        {
          openModal ? <Modal onClose={onModalClose} /> : null
        }
      </div>
      
    );
}

export default KandanBoard;