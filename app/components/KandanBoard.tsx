"use client";

import { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import PlusIcon from "./Icons/PlusIcon";
import { Container, Id } from "@/Types/Column";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import ColumnContainer from "./ColumnContainer";
import Modal from "./Modal";
import { getContainer, isSameContainer } from "@/utils";

const KandanBoard = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [activeId, setActiveId] = useState<Id | null>(null);
  const colsId = useMemo(() => containers.map((item) => item.id), [containers]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const createNewCol = (enteredVal: string) => {
    const containerToAdd: Container = {
      id: uuidv4(),
      title: enteredVal,
      taskItems: [],
    };
    setContainers((prev) => [...prev, containerToAdd]);
  };

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };

  const onModalClose = (value: string) => {
    value !== "" ? createNewCol(value) : null;
    setOpenModal(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log(active, over, "fsfsf");

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Container";
    const isActiveItem = active.data.current?.type === "Task";

    if (isActiveAColumn) {
      setContainers((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === activeId
        );

        const overColumnIndex = columns.findIndex((col) => col.id === overId);

        return arrayMove(containers, activeColumnIndex, overColumnIndex);
      });
    } else {
      const isContainerSame = isSameContainer(active, over);

      if (isContainerSame) {
        const container = getContainer(active.id, "Task", containers);
        if (!container) return;

        const oldIndex = container.taskItems.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = container.taskItems.findIndex(
          (item) => item.id === over.id
        );

        const activeContainerIndex = containers.findIndex(
          (cont) => cont.id === container.id
        );

        const newObj = [...containers];

        newObj[activeContainerIndex].taskItems = arrayMove(
          container.taskItems,
          oldIndex,
          newIndex
        );

        container.taskItems.map((column) => {
          if (column.id === container.id) {
            return;
          }
          return column;
        });
        setContainers(newObj);
      } else {
        const activeContainer = getContainer(active.id, "Task", containers);
        const overContainer = getContainer(over.id, "Container", containers);

        if (!activeContainer || !overContainer) return;

        const activeContainerIndex = containers.findIndex(
          (container) => container.id === activeContainer.id
        );
        const overContainerIndex = containers.findIndex(
          (container) => container.id === overContainer.id
        );

        const activeitemIndex = activeContainer.taskItems.findIndex(
          (item) => item.id === active.id
        );

        // Remove the active item from the active container and add it to the over container
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].taskItems.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].taskItems.push(removeditem);
        setContainers(newItems);
      }
    }
  };

  const removeColumn = (colId: Id) => {
    const filteredCol = containers.filter((item) => item.id !== colId);
    setContainers(filteredCol);
  };

  useEffect(() => {
    if (openModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [openModal]);

  return (
    <div className="m-auto flex flex-col ">
      <div className="flex justify-between static items-center w-full m-10">
        <h2 className="text-lg font-semibold">Kanban Board Demo</h2>
        <div className="mr-20">
          <button
            onClick={() => setOpenModal(true)}
            className="h-[60px] w-[350px] min-w-[350px] rounded-lg bg-mainBgColor p-4 border-2 ring-rose-400 hover:ring-2 border-colBgColor cursor-pointer flex items-center gap-1 mr-4"
          >
            <PlusIcon />
            <span className="flex items-center">Add Column</span>
          </button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={onDragStart}
      >
        <div
          className="m-auto flex gap-4   overflow-x-auto
        overflow-y-hidden"
        >
          <div className="flex gap-4">
            <SortableContext items={colsId}>
              {containers.map((container) => (
                <ColumnContainer
                  key={container.id}
                  removeColumn={removeColumn}
                  setContainers={setContainers}
                  container={container}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>
      {openModal ? <Modal onClose={onModalClose} /> : null}
    </div>
  );
};

export default KandanBoard;
