import React from 'react'
import { useStateValue } from '../services/StateProvider';
import { Button, Dropdown, DropdownButton, FormControl, InputGroup, Table } from 'react-bootstrap';
import * as interfaces from '../interfaces';

function OrderBy() {
    const [tableUsersState, setTableUsersState] = useStateValue();
    return (
        <div className='orderBy'>
            <div className="tab__dropdown">
                <DropdownButton
                    className='table__orderBy__button'
                    key='orderBy'
                    id='dropdown-order-by'
                    variant='secondary'
                    title={`Order By: ${interfaces.UserFields[tableUsersState.orderBy.key as keyof interfaces.User]}`}
                >
                    {Object.keys(interfaces.UserFields).map(function (key) {
                        return <Dropdown.Item
                            eventKey={key}
                            onSelect={function (eventKey, _) {
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
                {Object.keys(interfaces.OrderByOptions).map(function (key) {
                    return <Dropdown.Item
                        eventKey={key}
                        onSelect={function (eventKey, _) {
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
    )
}

export default OrderBy
