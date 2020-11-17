import * as interfaces from '../interfaces';

export interface TableUsersState {
    users: interfaces.User[],
    orderBy: interfaces.OrderBy,
    filters: interfaces.Filter[]
    shouldQuery: boolean,
};
export const initialState = {
    users: [],
    orderBy: {
        key: 'level',
        order: 'desc',
    },
    filters: [],
    shouldQuery: true,
} as TableUsersState;

export default function reducer(state: TableUsersState = initialState, action: any): TableUsersState {
    return state;
}
