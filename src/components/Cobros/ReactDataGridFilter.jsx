import React, { Component, useState } from 'react'
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data, Filters } from "react-data-grid-addons";

import { FechaFlujoFormatter, ValorFlujoFormatter } from "../../utils/formatterFunctions";

const TipoFormatter = ({ row }) => {
    var res = "";

    switch (row.tipo) {
        case 1:
            res =  <div style={{ textAlign: 'center', fontSize: '1em' }}> <span className="badge badge-success">Entrada</span> </div>;
            break;
        case 2:
            res =  <div style={{ textAlign: 'center', fontSize: '1em' }}> <span className="badge badge-warning">Salida</span> </div>;
            break;
    }
    return res;
};

const defaultColumnProperties = {
    filterable: true,
    resizable: true,
};

const {
    NumericFilter,
    AutoCompleteFilter
} = Filters;

const selectors = Data.Selectors;

const columns = [
    {
        key: "descripcion",
        name: "Descripción",
        width: 283,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "tipo",
        name: "Tipo",
        formatter : TipoFormatter,
        width: 100,
    },
    {
        key: "fecha",
        name: "Fecha",
        width: 160,
        formatter: FechaFlujoFormatter,
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "valor",
        name: "Valor",
        width: 150,
        formatter: ValorFlujoFormatter,
        filterRenderer: NumericFilter
    }
].map(c => ({ ...c, ...defaultColumnProperties }));

const handleFilterChange = filter => filters => {
    const newFilters = { ...filters };
    if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
    } else {
        delete newFilters[filter.column.key];
    }
    return newFilters;
};

function getValidFilterValues(rows, columnId) {
    return rows
        .map(r => r[columnId])
        .filter((item, i, a) => {
            return i === a.indexOf(item);
        });
}

function getRows(rows, filters) {
    return selectors.getRows({ rows, filters });
}

export default function ReactDataGridFilter({ rows, height }) {

    const [filters, setFilters] = useState({});
    const filteredRows = getRows(rows, filters);

    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => filteredRows[i]}
            rowsCount={rows.length}
            minHeight={height}
            rowHeight={25}
            CellNavigationMode={"NONE"}
            toolbar={<Toolbar enableFilter={true} filterRowsButtonText="Filtrar" />}
            onAddFilter={filter => setFilters(handleFilterChange(filter))}
            onClearFilters={() => setFilters({})}
            getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
            enableCellSelect={true}
        />
    )
}