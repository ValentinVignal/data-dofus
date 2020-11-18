import cloneDeep from 'lodash/cloneDeep';
import React from 'react'
import { useStateValue } from '../../services/StateProvider';
import * as interfaces from '../../interfaces';
import { Button, Dropdown, DropdownButton, FormControl, InputGroup, Table } from 'react-bootstrap';
import Filter from './Filter';
import './Filters.scss';

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
            <div className="filters__addButton">
                <h3>Filters</h3>
                <Button variant='secondary' onClick={addFilter}>
                    + Add Filter
                </Button>
            </div>
            <div className="filters__filters">
                {tableUsersState.filters.map(function (filter, index) {
                    return <Filter index={index} />;
                })}
            </div>
        </div>
    )
}

export default Filters
