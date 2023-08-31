import { UniqueIdentifier } from '@dnd-kit/core';

export type Id = UniqueIdentifier


export type Container = {
    id: Id
    title: string,
    taskItems: {
        id: Id
        title: string,
    }[]
}