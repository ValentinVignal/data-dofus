
import firebase  from 'firebase';
export default interface Filter {
    key: string|null,
    value: string|number|null,
    operation: firebase.firestore.WhereFilterOp|null,
}

export const WhereFilterOperation = [
    '<',
    '<=',
    '==',
    '!=',
    '>=',
    '>',
    // 'array-contains',
    // 'in',
    // 'array-contains-any',
    // 'not-in',
];