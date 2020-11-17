import cloneDeep from 'lodash/cloneDeep';
import React from 'react'
import { useStateValue } from '../../services/StateProvider';
import * as interfaces from '../../interfaces';
import { Button, Dropdown, DropdownButton, FormControl, InputGroup, Table } from 'react-bootstrap';
import Filter from './Filter';

function Filters() {
    const [tableUsersState, setTableUsersState] = useStateValue();
    function addFilter(): void {
        const filters = cloneDeep(tableUsersState.filters);
        filters.push({} as interfaces.Filter);
        setTableUsersState({
            ...tableUsersState,
            filters,
        });
    }

    return (
        <div className="filters">
            <Button variant='secondary' onClick={addFilter}>
                +
            </Button>
            {tableUsersState.filters.map(function (filter, index) {
                return <Filter index={index} />;
            })}
        </div>
    )
}

export default Filters
