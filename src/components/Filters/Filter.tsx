import React from 'react'
import { useStateValue } from '../../services/StateProvider';
import cloneDeep from 'lodash/cloneDeep';
import { Button, Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import * as interfaces from '../../interfaces';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Filter.scss';

interface FilterProps {
    index: number,
};

function Filter(props: FilterProps) {
    const index = props.index;
    const [tableUsersState, setTableUsersState] = useStateValue();
    const filter = tableUsersState.filters[index];
    return (
        <div className='filter'>
            <InputGroup key={index} className='mb-3'>
                <DropdownButton
                    as={InputGroup.Prepend}
                    className='filter_label'
                    key='filterKey'
                    id='dropdown-filter-key'
                    variant='outline-secondary'
                    title={`Filter by: ${filter.key ? interfaces.UserFields[filter.key as keyof interfaces.User] : ''}`}
                >
                    {Object.keys(interfaces.UserFields).map(function (key) {
                        return <Dropdown.Item
                            eventKey={key}
                            onSelect={function (eventKey, _) {
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
                    as={InputGroup.Prepend}
                    className='table__filter__operation__button'
                    key='orderBy'
                    id='dropdown-order-by'
                    variant='outline-secondary'
                    title={`${filter.operation ? filter.operation : ''}`}
                >
                    {interfaces.WhereFilterOperation.map(function (operation) {
                        return <Dropdown.Item
                            eventKey={operation}
                            onSelect={function (eventKey, _) {
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
                    // size='sm'
                    aria-describedby="basic-addon2"
                    placeholder='Value'
                    onChange={function (event) {
                        console.log('event', event, event.target.value);
                        if (event.target.value === '' || event.target.value) {
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
                    onKeyPress={function (event: React.KeyboardEvent<HTMLInputElement>) {
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
                <InputGroup.Append>
                    <Button
                        variant='outline-danger'
                        onClick={function () {
                            const filters = cloneDeep(tableUsersState.filters);
                            filters.splice(index, 1);   // Remove the filter;
                            const shouldQuery = !!(filter.key && filter.operation && filter.value);
                            setTableUsersState({
                                ...tableUsersState,
                                shouldQuery,
                                filters,
                            });
                        }}
                    >
                        x
                    </Button>
                </InputGroup.Append>


            </InputGroup>
        </div>
    )
}

export default Filter
