export default interface User {
    id: string,
    level: number,
    Chance_base: number,
    Chance_bonus: number,
    Chance_total: number
}

export const UserFields = {
    id: 'Id',
    level: 'Level',
    Chance_base: 'Chance Base',
    Chance_bonus: 'Chance Bonus',
    Chance_total: 'Chance Total',
}