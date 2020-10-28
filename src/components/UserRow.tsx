import React from 'react'
import { User } from '../interfaces'


interface UserRowProps {
    index: number,
    user: User,
}

function UserRow(props: UserRowProps) {
    const {index, user} = props;
    return (
        <tr>
            <td>{index}</td>
            <td>{user.id}</td>
            <td>{user.level}</td>
            <td>{user.Chance_base}</td>
            <td>{user.Chance_bonus}</td>
            <td>{user.Chance_total}</td>
        </tr>
    )
}

export default UserRow
