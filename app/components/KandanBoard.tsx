"use client"

import { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import PlusIcon from "./Icons/PlusIcon";
import { Container, Id } from "@/Types/Column";
import {DndContext, DragEndEvent, DragStartEvent, PointerSensor, KeyboardSensor, useSensor, useSensors} from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import ColumnContainer from "./ColumnContainer";
import Modal from "./Modal";

const KandanBoard = () => {

    const [containers, setContainers] = useState<Container[]>([])
    const [openModal, setOpenModal] = useState(false);
    const colsId = useMemo(()=> containers.map((item)=> item.id),[containers])

    const sensors = useSensors(useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    )

    const createNewCol = (enteredVal: string) => {
        const containerToAdd: Container = {
            id: uuidv4(),
            title: enteredVal,
            taskItems: []
        }
        setContainers(prev => [...prev, containerToAdd])
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
  
    
      setContainers((columns) => {
        const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
  
        const overColumnIndex = columns.findIndex((col) => col.id === overId);
  
        return arrayMove(containers, activeColumnIndex, overColumnIndex);
      });
        
    }


    const removeColumn = (colId: Id) => {
        const filteredCol = containers.filter( item => item.id !== colId)
        setContainers(filteredCol)
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
            {containers.map((container) => (
              <ColumnContainer key={container.id} removeColumn={removeColumn} setContainers={setContainers} container={container} />
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