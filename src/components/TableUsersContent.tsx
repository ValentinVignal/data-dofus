import React from 'react'
import { Table } from 'react-bootstrap';
import { useStateValue } from '../services/StateProvider';
import UserRow from './UserRow';

function TableUsersContent() {
    const [tableUsersState, setTableUsersState] = useStateValue();
    return (
        <div className='tableUsersContent'>
            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Level</th>
                        <th>Chance Base</th>
                        <th>Chance Bonus</th>
                        <th>Chance Total</th>
                    </tr>
                </thead>
                <tbody>
                    {tableUsersState.users?.map(function (user, index) {
                        return <UserRow index={index} user={user} />
                    })}
                </tbody>
            </Table>

        </div>
    )
}

export default TableUsersContent
