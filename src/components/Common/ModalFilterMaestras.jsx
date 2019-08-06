import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

// import Modal from './Modal'
import BoxButtonV2 from './BoxButtonV2'
import Modal from './ModalFilters/Modal'
import ModalHeader from './ModalFilters/ModalHeader'
import ModalBody from './ModalFilters/ModalBody'
import ModalFooter from './ModalFilters/ModalFooter'
import BrandButton from './BrandButton'
// import ButtonStrip from './ModalFilters/ButtonStrip'

import {
    showHideModalFilter,
    addModalFilterCriteria,
    updateModalFilterCriteria,
    removeCheckedModalFilterCriterias,
    toggleCheckedModalFilterCriterias,
    applyModalFilterCriterias,
    // showBackdrop,
} from '../../actions/filtrarData'

import { operators } from '../../utils/helpers'

class ModalFilter extends Component {
    handleCloseModal = (e) => {
        const modal = document.getElementById('modalFilter')
        modal.classList.remove('fadeIn')
        modal.classList.add('fadeOut')

        const modalDialog = document.querySelector(`#modalFilter .modal-dialog`)
        modalDialog.classList.remove('zoomIn')
        modalDialog.classList.add('zoomOut')

        setTimeout(() => this.props.showHideModalFilter(false), 300)
    }

    handleApplyFilters = (e) => {
        this.handleCloseModal()
        this.props.applyModalFilterCriterias()
    }

    render() {

        if (!this.props.modalFilter) {
            return null
        }

        const columns = this.props.columnas.map((item1, index1) => {
            return {
                key: `opt1[${item1.get('ID')}][${index1}]`,
                value: item1.get('STRING') !== undefined ? item1.get('STRING') : item1.get('VALUE'),
                caption: item1.get('CAPTION')
            }
        })
            .sort((a, b) => {
                var nameA = a.caption.toUpperCase()
                var nameB = b.caption.toUpperCase()
                if (nameA < nameB) return -1
                if (nameA > nameB) return 1
                return 0
            }).filter(x => x.caption !== '')

        const buttons1 = [
            <BoxButtonV2 key="bb[1][0]" name="plus-circle" onClick={e => this.props.addModalFilterCriteria()} title="Nuevo" />,
            <BoxButtonV2 key="bb[1][1]" name="trash" onClick={e => this.props.removeCheckedModalFilterCriterias()} title="Eliminar" disabled={this.props.modalFilters.filter(item => item.get('checked')).count() === 0} />,
        ]


        return (
            <Modal id="modalFilter" show={true} ZIndex={2000}>
                <ModalHeader title="Filtrar información" onClose={e => this.handleCloseModal(e, "modalFilter")} />
                <BrandButton buttons={buttons1} />
                <ModalBody >
                    <div >
                        <div className="row">
                            <div className="col-lg-12">
                                <table className="table table-bordered table-condensed table-hover table-striped table-sm">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '20px' }}></th>
                                            <th>Columna</th>
                                            <th>Operador</th>
                                            <th>Filtro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.modalFilters.count() > 0 ? this.props.modalFilters.map((item, index) => {
                                                const key = `tr2[${index}]`
                                                return (
                                                    <tr key={key} className={`${item.get('checked') ? 'info' : ''}`}>
                                                        <td style={{ verticalAlign: 'middle' }}>
                                                            <input type="checkbox" onChange={e => this.props.toggleCheckedModalFilterCriterias(index, e.target.checked)} checked={item.get('checked')} />
                                                        </td>
                                                        <td>
                                                            <select className="form-control form-control-sm" value={item.get('column')} onChange={e => this.props.updateModalFilterCriteria(index, 'column', e.target.value)}>
                                                                {
                                                                    columns.map(x => {
                                                                        return <option key={x.key} value={x.value}>{x.caption}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="form-control form-control-sm" value={item.get('operator')} onChange={e => this.props.updateModalFilterCriteria(index, 'operator', e.target.value)}>
                                                                {
                                                                    operators.map((item1, n) => {
                                                                        return (
                                                                            <option key={`opt2[${item1.id}][${n}]`} value={item1.value}>{item1.caption}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input type="text" className="form-control form-control-sm" value={item.get('value')} onChange={e => this.props.updateModalFilterCriteria(index, 'value', e.target.value)} />
                                                        </td>
                                                    </tr>
                                                )
                                            }) : <tr><td colSpan="4" style={{ textAlign: 'center' }}>No hay filtros</td></tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-default" type="button" onClick={this.handleApplyFilters}>Filtrar</button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modalFilter: state.common.get('modalFilter'),
        modalFilters: state.common.get('modalFilters'),
        columnas: state.common.get('columnas'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showHideModalFilter: (state) => dispatch(showHideModalFilter(state)),
        addModalFilterCriteria: () => dispatch(addModalFilterCriteria()),
        updateModalFilterCriteria: (index, attr, value) => dispatch(updateModalFilterCriteria(index, attr, value)),
        removeCheckedModalFilterCriterias: () => dispatch(removeCheckedModalFilterCriterias()),
        toggleCheckedModalFilterCriterias: (index, checked) => dispatch(toggleCheckedModalFilterCriterias(index, checked)),
        applyModalFilterCriterias: () => dispatch(applyModalFilterCriterias()),
        // showBackdrop: () => dispatch(showBackdrop()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFilter)