import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import * as interfaces from '../interfaces';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import UserRow from './UserRow';
import 'bootstrap/dist/css/bootstrap.min.css';


function TableUsers() {

    const [users, setUsers] = useState([] as interfaces.User[]);
    const [orderBy, setOrderBy] = useState('level');
    const [orderByDirection, setOrderByDirection] = useState('desc');


    useEffect(function() {
        onUseEffect();
    });

    async function onUseEffect() {
        const querySnapshot = await db.collection('users').orderBy(orderBy, orderByDirection as "asc"|"desc").limit(20).get();
        console.log('docs', querySnapshot.docs.length);
        setUsers(querySnapshot.docs.map(function(documentSnapshot) {
            const user = documentSnapshot.data() as interfaces.User;
            user.id = documentSnapshot.id;
            return user;
        }));
    }
    
    return (
        <div className='table'>
            <div className="table__filter">

            </div>
            <div className="table__orderBy">
                <DropdownButton
                    key='orderBy'
                    id='dropdown-order-by'
                    variant='secondary'
                    title={`Order By: ${orderBy}`}
                >
                    {['id', 'level', 'Chance_base', 'Chance_bonus', 'Chance_total'].map(function(key) {
                        return <Dropdown.Item
                            eventKey={key}
                            onSelect={function(eventKey, _){
                                setOrderBy(eventKey as string);
                            }}
                        >
                            {key}
                        </Dropdown.Item>;
                    })}
                </DropdownButton>
                <DropdownButton
                    key='orderByDirection'
                    id='dropdown-order-by-direction'
                    variant='secondary'
                    title={orderByDirection}
                >
                    {['desc', 'asc'].map(function(key) {
                        return <Dropdown.Item
                            eventKey={key}
                            onSelect={(eventKey, _) => setOrderByDirection(eventKey as string)}
                        >
                            {key}
                        </Dropdown.Item>;
                    })}
                </DropdownButton>

            </div>
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
