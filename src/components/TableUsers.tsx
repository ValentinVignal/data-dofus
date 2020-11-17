import React, { useEffect } from 'react'
import { db } from '../firebase';
import * as interfaces from '../interfaces';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TableUsers.css';
import firebase from 'firebase';
import { useStateValue } from '../services/StateProvider';
import Filters from './Filters/Filters';
import TableUsersContent from './TableUsersContent';


function TableUsers() {


    const [tableUsersState, setTableUsersState] = useStateValue();

    // To excecute after rendering
    useEffect(function () {
        console.log('in useEffect');
        onUseEffect();
    });
    console.log('builder', tableUsersState.shouldQuery);
    console.log(tableUsersState.users);

    async function onUseEffect(): Promise<void> {
        console.log('very start onUseEffect');
        if (!tableUsersState.shouldQuery) {
            return;
        }
        console.log('start onUseEffect');
        let collectionReference = db.collection('users');
        collectionReference = tableUsersState.filters.reduce<firebase.firestore.CollectionReference<firebase.firestore.DocumentData>>(function (accumulator: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>, filter) {
            if (!!(filter.key && filter.operation && filter.value)) {
                let value = filter.value as string | number;
                try {
                    value = parseInt(value as string);
                } catch (err) {

                }
                return accumulator.where(filter.key, filter.operation, value) as firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
            } else {
                return accumulator;
            }
        }, collectionReference) as firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
        const querySnapshot = await collectionReference.orderBy(tableUsersState.orderBy.key, tableUsersState.orderBy.order).limit(20).get();
        const users = querySnapshot.docs.map(function (documentSnapshot) {
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
                <Filters />
            </div>
            <div className="table__orderBy">

            </div>
            <div className="table__content">
                <TableUsersContent />
            </div>
        </div>
    );
}

export default TableUsers
