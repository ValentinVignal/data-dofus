import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import * as interfaces from '../interfaces';
import { Table } from 'react-bootstrap';
import UserRow from './UserRow';
import 'bootstrap/dist/css/bootstrap.min.css';


function TableUsers() {

    const [users, setUsers] = useState([] as interfaces.User[]);

    useEffect(function() {
        onUseEffect();
    });

    async function onUseEffect() {
        const querySnapshot = await db.collection('users').get();
        console.log('docs', querySnapshot.docs.length);
        setUsers(querySnapshot.docs.map(function(documentSnapshot) {
            return documentSnapshot.data() as interfaces.User;
        }));
    }
    
    return (
        <div className='table'>
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
                    {users?.map(function(user, index) {
                        return <UserRow index={index} user={user}/>
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default TableUsers
