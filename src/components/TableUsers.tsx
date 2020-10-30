import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import * as interfaces from '../interfaces';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import UserRow from './UserRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TableUsers.css';


function TableUsers() {

    const [users, setUsers] = useState([] as interfaces.User[]);
    const [orderBy, setOrderBy] = useState({key: 'level', order: 'desc'} as interfaces.OrderBy);



    useEffect(function() {
        onUseEffect();
    });

    async function onUseEffect() {
        const querySnapshot = await db.collection('users').orderBy(orderBy.key, orderBy.order).limit(20).get();
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
                <div className="tab__dropdown">
                <DropdownButton
                    className='table__orderBy__button'
                    key='orderBy'
                    id='dropdown-order-by'
                    variant='secondary'
                    title={`Order By: ${interfaces.UserFields[orderBy.key as keyof interfaces.User]}`}
                >
                    {Object.keys(interfaces.UserFields).map(function(key) {
                        return <Dropdown.Item
                            eventKey={key}
                            onSelect={function(eventKey, _){
                                if (eventKey) {
                                    orderBy.key = eventKey;
                                    setOrderBy(orderBy);
                                }
                            }}
                        >
                            {interfaces.UserFields[key as keyof interfaces.User]}
                        </Dropdown.Item>;
                    })}
                </DropdownButton>

                </div>
                <div className="tab__dropdown">
                </div>
                <DropdownButton
                    className='table__orderBy__button'
                    key='orderByDirection'
                    id='dropdown-order-by-direction'
                    variant='secondary'
                    title={interfaces.OrderByOptions[orderBy.order]}
                >
                    {Object.keys(interfaces.OrderByOptions).map(function(key) {
                        return <Dropdown.Item
                            eventKey={key}
                            onSelect={function(eventKey, _){
                                if (eventKey) {
                                    orderBy.order = eventKey as interfaces.OrderBy['order'];
                                    setOrderBy(orderBy);
                                }
                            }}
                        >
                            {interfaces.OrderByOptions[key as keyof interfaces.OrderByOptionsInterface]}
                        </Dropdown.Item>;
                    })}
                </DropdownButton>

            </div>
            <div className="table__values">
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
        </div>
    )
}

export default TableUsers
