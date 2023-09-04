import { Container, Id } from "./Types/Column";

export  function  getContainer(id: Id, type: string, containers: Container[]) {

    if (type === 'Container') {
        return containers.find((item) => item.id === id);
      }

    if (type === 'Task') {
        return  containers.find((container) =>
          container.taskItems.find((item) => item.id === id),
        );
      }
}

export function isSameContainer(activeContainer, overContainer) {
    const activeContainerId = activeContainer.data.current.sortable.containerId
    const overContainerId = overContainer.data.current.sortable.containerId
    return activeContainerId === overContainerId
}