import { Container } from "@/Types/Column";
import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  container: Container;
  setContainers: any;
  taskId: string | number;
}

const TaskItem = (props: TaskProps) => {
  const { container, taskId, setContainers } = props;
  const [taskTitle, setTaskTitle] = useState("");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: taskId,
    data: {
      type: "Task",
    },
  });

  function debounce<T extends (...args: any[]) => void>(
    func: T,
    timeout = 300
  ) {
    let timer: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.bind(null, ...args);
      }, timeout);
    };
  }

  function setTask(arg: string) {
    console.log(`Function called with argument: ${arg}`);
    container.taskItems.map((item) => {
      if (item.id === taskId) {
        return {
          ...item,
          title: arg,
        };
      }
      return item;
    });
    setContainers((prev: Container[]) => {
      return prev.map((cont: Container) => {
        if (container.id === cont.id) {
          const subTask = cont.taskItems.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                title: arg,
              };
            }
            return task;
          });

          return {
            ...cont,
            subTask,
          };
        }
        return cont;
      });
    });
  }

  useEffect(() => {
    const fnc = debounce(setTask, 500);
    fnc(taskTitle);
  }, [taskTitle]);

  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      {...attributes}
      {...listeners}
      className="flex items-center mb-2"
    >
      <textarea
        value={taskTitle}
        autoFocus
        onChange={(e) => {
          // setContainers
          setTaskTitle(e.target.value);
        }}
        className="flex-grow bg-colBgColor h-20 rounded px-2 py-1 hover:border-rose-400 outline-none transition border border-transparent focus:border-rose-400"
      />
    </div>
  );
};

export default TaskItem;
