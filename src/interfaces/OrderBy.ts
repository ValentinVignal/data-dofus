export default interface OrderBy {
    key: string,
    order: 'desc'|'asc'
};

export interface OrderByOptionsInterface {
    desc: string,
    asc: string
}

export const OrderByOptions = {
    desc: 'Descending',
    asc: 'Ascending',
};