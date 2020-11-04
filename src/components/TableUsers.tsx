import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import * as interfaces from '../interfaces';
import { Button, Dropdown, DropdownButton, FormControl, InputGroup, Table } from 'react-bootstrap';
import UserRow from './UserRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TableUsers.css';
import firebase  from 'firebase';
import { isTypeOnlyImportOrExportDeclaration } from 'typescript';


function TableUsers() {

    const [users, setUsers] = useState([] as interfaces.User[]);
    const [orderBy, setOrderBy] = useState({key: 'level', order: 'desc'} as interfaces.OrderBy);
    const [filters, setFilters] = useState([] as interfaces.Filter[]);
    console.log('filters', filters);
    if (filters.length) {
        const filter = filters[0];
        console.log(filter.key, filter.operation, filter.value, typeof(filter.value));
    }
    useEffect(function() {
        onUseEffect();
    });

    function addFilter() {
        filters.push({} as interfaces.Filter);
        setFilters(filters);
    }

    async function onUseEffect() {
        let collectionReference = await db.collection('users');
        collectionReference = filters.reduce<firebase.firestore.CollectionReference<firebase.firestore.DocumentData>>(function(accumulator: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, filter) {
            if (filter.key && filter.operation && filter.value) {
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
        const querySnapshot = await collectionReference.orderBy(orderBy.key, orderBy.order).limit(20).get();
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
            <div className="table__filters">
                <Button variant='secondary' onClick={addFilter}>
                    +
                </Button>
                {filters.map(function(filter, index) {
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
                                        filters[index].key = eventKey;
                                        setFilters(filters);
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
                                        filters[index].operation = operation as interfaces.Filter['operation'];
                                        setFilters(filters);
                                    }}
                                >
                                    {operation}
                                </Dropdown.Item>;
                            })}
                        </DropdownButton>

                        <FormControl
                            placeholder='Value'
                            onChange={function(event) {
                                filters[index].value = event.target.value;
                                setFilters(filters);
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
