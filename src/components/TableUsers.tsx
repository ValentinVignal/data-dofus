import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import * as interfaces from '../interfaces';
import { Button, Dropdown, DropdownButton, FormControl, InputGroup, Table } from 'react-bootstrap';
import UserRow from './UserRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TableUsers.css';
import firebase  from 'firebase';
import cloneDeep from 'lodash/cloneDeep';

interface TableUserInterface {
    users: interfaces.User[],
    orderBy: interfaces.OrderBy,
    filters: interfaces.Filter[]
    shouldQuery: boolean,
};

function TableUsers() {

    const [tableUsersState, setTableUsersState] = useState({
        users: [],
        orderBy: {
            key: 'level',
            order: 'desc',
        },
        filters: [],
        shouldQuery: true,
    } as TableUserInterface)

    useEffect(function() {
        console.log('in useEffect');
        onUseEffect();
    });
    console.log('builder', tableUsersState.shouldQuery);
    console.log(tableUsersState.users);

    function addFilter() {
        const filters = cloneDeep(tableUsersState.filters);
        filters.push({} as interfaces.Filter);
        setTableUsersState({
            ...tableUsersState,
            filters,
        });
    }

    async function onUseEffect() {
        console.log('very start onUseEffect');
        if (!tableUsersState.shouldQuery) {
            return;
        }
        console.log('start onUseEffect');
        let collectionReference = await db.collection('users');
        collectionReference = tableUsersState.filters.reduce<firebase.firestore.CollectionReference<firebase.firestore.DocumentData>>(function(accumulator: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, filter) {
            if (!!(filter.key && filter.operation && filter.value)) {
                let value = filter.value as string|number;
                try {
                    value = parseInt(value as string);
                } catch(err) {

                }
                return accumulator.where(filter.key, filter.operation, value) as firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
            } else {
                return accumulator;
            }
        }, collectionReference) as firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
        const querySnapshot = await collectionReference.orderBy(tableUsersState.orderBy.key, tableUsersState.orderBy.order).limit(20).get();
        const users = querySnapshot.docs.map(function(documentSnapshot) {
            const user = documentSnapshot.data() as interfaces.User;
            user.id = documentSnapshot.id;
            return user;
        });
        setTableUsersState({
            ...tableUsersState,
            users,
            shouldQuery: false,
        });
    }
    
    return (
        <div className='table'>
            <div className="table__filter">

            </div>
            <div className="table__filters">
                <Button variant='secondary' onClick={addFilter}>
                    +
                </Button>
                {tableUsersState.filters.map(function(filter, index) {
                    return <InputGroup key={index}>
                        <DropdownButton
                            className='table__filter__key__button'
                            key='filterKey'
                            id='dropdown-filter-key'
                            variant='secondary'
                            title={`Filter by: ${filter.key ? interfaces.UserFields[filter.key as keyof interfaces.User] : ''}`}
                        >
                            {Object.keys(interfaces.UserFields).map(function(key) {
                                return <Dropdown.Item
                                    eventKey={key}
                                    onSelect={function(eventKey, _){
                                        const updatedFilter = {
                                            ...filter,
                                            key: eventKey,
                                        };
                                        const filters = cloneDeep(tableUsersState.filters);
                                        filters[index] = updatedFilter;
                                        const shouldQuery = !!(updatedFilter.key && updatedFilter.operation && updatedFilter.value)
                                        setTableUsersState({
                                            ...tableUsersState,
                                            shouldQuery,
                                            filters,
                                        });
                                    }}
                                >
                                    {interfaces.UserFields[key as keyof interfaces.User]}
                                </Dropdown.Item>;
                            })}
                        </DropdownButton>

                        <DropdownButton
                            className='table__filter__operation__button'
                            key='orderBy'
                            id='dropdown-order-by'
                            variant='secondary'
                            title={`${filter.operation ? filter.operation : ''}`}
                        >
                            {interfaces.WhereFilterOperation.map(function(operation) {
                                return <Dropdown.Item
                                    eventKey={operation}
                                    onSelect={function(eventKey, _){
                                        const updatedFilter = {
                                            ...filter,
                                            operation: eventKey as interfaces.Filter['operation'],
                                        };
                                        const filters = cloneDeep(tableUsersState.filters);
                                        filters[index] = updatedFilter;
                                        const shouldQuery = !!(updatedFilter.key && updatedFilter.operation && updatedFilter.value)
                                        setTableUsersState({
                                            ...tableUsersState,
                                            shouldQuery,
                                            filters,
                                        });
                                    }}
                                >
                                    {operation}
                                </Dropdown.Item>;
                            })}
                        </DropdownButton>

                        <FormControl
                            size='sm'
                            placeholder='Value'
                            onChange={function(event) {
                                console.log('event', event, event.target.value);
                                if(event.target.value === '' || event.target.value) {
                                    const updatedFilter = {
                                        ...filter,
                                        value: event.target.value,
                                    };
                                    const filters = cloneDeep(tableUsersState.filters);
                                    filters[index] = updatedFilter;
                                    setTableUsersState({
                                        ...tableUsersState,
                                        filters,
                                    });
                                }
                            }}
                            onKeyPress={function(event: React.KeyboardEvent<HTMLInputElement>) {
                                if (event.key === 'Enter') {
                                    const shouldQuery = !!(filter.key && filter.operation && filter.value)
                                    console.log('shouldQuery', shouldQuery, filter);
                                    setTableUsersState({
                                        ...tableUsersState,
                                        shouldQuery,
                                    })
                                }
                            }}
                        />


                    </InputGroup>
                })}
            </div>
            <div className="table__orderBy">
                <div className="tab__dropdown">
                <DropdownButton
                    className='table__orderBy__button'
                    key='orderBy'
                    id='dropdown-order-by'
                    variant='secondary'
                    title={`Order By: ${interfaces.UserFields[tableUsersState.orderBy.key as keyof interfaces.User]}`}
                >
                    {Object.keys(interfaces.UserFields).map(function(key) {
                        return <Dropdown.Item
                            eventKey={key}
                            onSelect={function(eventKey, _){
                                if (eventKey) {
                                    setTableUsersState({
                                        ...tableUsersState,
                                        orderBy: {
                                            ...tableUsersState.orderBy,
                                            key: eventKey,
                                        },
                                        shouldQuery: true,
                                    });
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
                    title={interfaces.OrderByOptions[tableUsersState.orderBy.order]}
                >
                    {Object.keys(interfaces.OrderByOptions).map(function(key) {
                        return <Dropdown.Item
                            eventKey={key}
                            onSelect={function(eventKey, _){
                                if (eventKey) {
                                    setTableUsersState({
                                        ...tableUsersState,
                                        orderBy: {
                                            ...tableUsersState.orderBy,
                                            order: eventKey as interfaces.OrderBy['order'],
                                        },
                                        shouldQuery: true,
                                    });
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
                        {tableUsersState.users?.map(function(user, index) {
                            return <UserRow index={index} user={user}/>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TableUsers
