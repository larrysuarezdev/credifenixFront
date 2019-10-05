import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import 'react-virtualized/styles.css'

import { AutoSizer, MultiGrid } from 'react-virtualized'

import { isNumber } from 'util';
import { findValues } from "../../utils/helpers";
import numeral from 'numeral'
import moment from 'moment'



class TableVirtualized extends Component {

    reloadGrid = () => {
        const grid = this.refs.AutoSizer.refs.MultiGrid
        grid.forceUpdateGrids()
    }

    componentDidUpdate() {
        this.reloadGrid();
    }

    getColumnWidth = ({ index }) => {
        const c = this.props.tableColumns[index]
        return c.WIDTH || 80
    }

    cellRenderer = ({ columnIndex, key, rowIndex, style }) => {

        let styles = style
        if (rowIndex === 0) {
            styles.alignment = 'center'
            let col = this.props.tableColumns[columnIndex]
            let contenidoHeader = col.CAPTION;

            if (col.RENDER_HEADER) {
                contenidoHeader = col.RENDER_HEADER();
            }

            style = { ...style, ...styles };

            return <div key={key} className="rvtableheader" style={style}>{contenidoHeader}</div>
        } else {
            const ri = rowIndex - 1
            if (!isNumber(ri)) return null
            const id = this.props.ids.get(ri)
            const c = this.props.tableColumns[columnIndex]
            const a = this.props.list.get(id)
            const selected = this.props.selected === a.get(String(this.props.keyVal))

            let alignment = 'left'
            let value = findValues(c, a);

            if (c.TYPE) {
                switch (c.TYPE) {
                    case 'DATE':
                        value = value !== null ? moment(value).format(c.FORMAT) : null
                        alignment = 'right'
                        break
                    case 'NUMBER':
                        // value = c.EDIT ? <input type="number" className="form-control form-control-sm1" value={value !== null ? numeral(value).format(c.FORMAT) : 0} /> : value !== null ? numeral(value).format(c.FORMAT) : 0
                        value = c.EDIT ? <input type="number" className="form-control form-control-sm1" value={value !== null ? value : 0} onChange={(e) => this.props.onChange('RUTA', a.get(String(this.props.keyVal)), c.VALUE, e.target.value)} /> : value !== null ? numeral(value).format(c.FORMAT) : 0
                        alignment = 'right'
                        break
                    case 'BOOLEAN':
                        value = <div style={{ textAlign: 'center', fontSize: '1.1em' }}><FontAwesome name={`${value ? 'check-' : ''}square`} /></div>
                        break
                    case 'BUTTON':
                        value = <div style={{ textAlign: 'center', fontSize: '1em' }}><FontAwesome name={c.VALUE} onClick={() => this.props.actionClick(a.get(String(this.props.keyVal)))} /></div>
                        break;
                    case 'CHECKBOX':
                        value = <input type="checkbox"
                            onChange={e => this.props.checkClick(a.get(String(this.props.keyVal)), e.target.checked)}
                            checked={a.get('checked')}
                            style={{ height: 15 }}
                        />
                        break;
                    default:
                }
            }

            styles.textAlign = alignment
            styles.cursor = 'pointer'

            style = { ...style, ...styles };

            return (
                <div key={key} className={`rvtablecell2 ${c.FIXED ? 'fixed' : ''} ${selected ? 'info' : ''} `} style={style} onClick={e => this.props.actionSelect(a.get(this.props.keyVal), this.reloadGrid, this.props.tipo)}>
                    {value}
                </div>
            )
        }
    }

    render() {
        const { ids, tableColumns } = this.props;
        const columnCount = tableColumns.length || 0
        const rowCount = (ids.count() || 0) + 1

        return (
            <AutoSizer ref="AutoSizer">
                {({ width, height }) => (
                    <MultiGrid
                        ref="MultiGrid"
                        cellRenderer={this.cellRenderer}
                        columnWidth={this.getColumnWidth}
                        columnCount={columnCount}
                        fixedColumnCount={tableColumns.filter(x => x.FIXED).length}
                        fixedRowCount={1}
                        height={height}
                        rowHeight={20}
                        rowCount={rowCount}
                        width={width}
                        enableFixedRowScroll
                        enableFixedColumnScroll
                        hideTopRightGridScrollbar
                        hideBottomLeftGridScrollbar
                    />
                )}
            </AutoSizer>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableVirtualized)