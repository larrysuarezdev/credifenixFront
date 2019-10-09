import axios from 'axios'
import { Cookies } from 'react-cookie';
import objectifyArray from 'objectify-array'
import Immutable from 'immutable'
import { API_URL } from '../actions/index'
import moment from 'moment'

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const SIZE_EXPORT = window.SIZE_EXPORT;
const cookie = new Cookies();

export function createAxiosInstance() {
    const token = cookie.get('token')
    return axios.create({
        baseURL: API_URL,
        headers: { 'Authorization': 'Bearer ' + token }
    })
}

export const axiosWithAuth = axios.create({
    baseURL: API_URL,
    headers: { 'Authorization': 'Bearer ' + cookie.get('token') }
})

export const axiosNoAuth = axios.create({
    baseURL: API_URL
    // headers: { 'Content-Type' : 'application/json'}
})

export function findValues(c, x) {
    let value = x.getIn(c.VALUE.split('.'))
    return value
}

export function hasClass(el, className) {
    if (el.classList) {
        return el.classList.contains(className)
    } else {
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }
}

export function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className)
    } else if (!hasClass(el, className)) {
        el.className += " " + className
    }
}

export function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className)
    } else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className = el.className.replace(reg, ' ')
    }
}

export function getInnerException(obj) {
    if (obj instanceof Object && obj.InnerException) {
        return getInnerException(obj.InnerException)
    } else {
        const toReturn = { ...obj }
        return toReturn
    }
}

export function recalculate(data, id, cargue = false) {
    let res = []
    let cartera = 0;
    data = data.toList().toJS();

    data.map((x) => {
        x.valor_total = x.mod_cuota * x.mod_dias;
        let abonos = 0;
        if (x.creditos_detalles !== undefined) {
            const entries = Object.entries(x.creditos_detalles);
            entries.forEach(element => {
                abonos = abonos + element[1].abono
            });

            if (entries.length > 0) {
                const ultimoPago = entries.reduce(function (a, b) { return (a.id > b.id) ? a : b; });
                // console.log(entries, ultimoPago);

                x.valor_ultimo_pago = ultimoPago[1].abono;
                x.fecha_ultimo_pago = ultimoPago[1].fecha_abono;
            } else {
                x.valor_ultimo_pago = 0;
                x.fecha_ultimo_pago = "";
            }
        }
        const creditos_renovaciones = Object.entries(x.creditos_renovaciones);
        // console.log(creditos_renovaciones, x.id)

        const inicio_credito = creditos_renovaciones.length > 0 ? creditos_renovaciones[creditos_renovaciones.length - 1][1].fecha : x.inicio_credito;
        x.inicio_credito = inicio_credito;

        x.saldo = x.valor_total - abonos;
        x.cuotas_pagas = parseFloat((x.valor_total - x.saldo) / x.mod_cuota).toFixed(1);

        // const DiaAct = new Date(moment().format("YYYY-MM-DD"));
        // const inicioCredito = new Date(moment(inicio_credito).format("YYYY-MM-DD"));
        // var Difference_In_Time = DiaAct.getTime() - inicioCredito.getTime();

        // var days = Difference_In_Time / (1000 * 3600 * 24);
        // days = days - Math.floor(days / 7);
        // x.mora = days - Math.floor(x.cuotas_pagas);       

        if (cargue) {
            x.cuota = ''
        }

        cartera = cartera + x.saldo;
        res.push(x)
        return x
    })

    res = objectifyArray(res, {
        by: [id],
        recursive: true
    })

    return { list: Immutable.fromJS(res), cartera: cartera };
}

export function exportDataGrid(list, ruta, cobrador, fecha) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const data = list.toList().toJS().sort(function (a, b) { return a.orden - b.orden });

    var docDefinition = {
        pageSize: 'LEGAL',
        pageOrientation: 'landscape',
        fontSize: 3,
        pageMargins: [20, 20, 20, 20],
        content: [
            {
                table: {
                    widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
                    body: [
                        [
                            'COBRADOR', { text: cobrador !== 'Sin asignar' ? cobrador.nombres.toUpperCase() + ' ' + cobrador.apellidos.toUpperCase() : 'SIN ASIGNAR', italics: true, color: 'gray', alignment: "center" },
                            'TELEFONO', { text: cobrador !== 'Sin asignar' ? cobrador.telefono1.toUpperCase() : 'SIN ASIGNAR', italics: true, color: 'gray', alignment: "center" },
                            'FECHA', { text: moment(fecha).format('LL'), italics: true, color: 'gray', alignment: "center" },
                            'RUTA', { text: ruta, italics: true, color: 'gray', alignment: "center" }],
                    ]
                },
                margin: [SIZE_EXPORT, 5, 20, 5]
            },
            {
                table: {
                    headerRows: 1,
                    widths: [20, 20, 'auto', 'auto', 25, 20, 'auto', 20, 30, 'auto', 'auto', 30, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                        [
                            { text: 'Obs', style: 'header' },
                            { text: 'Orden', style: 'header' },
                            { text: 'Días', style: 'header' },
                            { text: 'Cliente', style: 'header' },
                            { text: 'Cuota', style: 'header' },
                            { text: 'Mora', style: 'header' },
                            { text: 'PAG', style: 'header' },
                            { text: 'Prestamo', style: 'header' },
                            { text: 'Modo', style: 'header' },
                            { text: 'Saldo', style: 'header' },
                            { text: 'Ult pag', style: 'header' },
                            { text: '$UP', style: 'header' },
                            { text: 'Inicio', style: 'header' },
                            { text: 'Negocio', style: 'header' },
                            { text: 'Dirección', style: 'header' },
                            { text: 'Telefono', style: 'header' },
                            { text: 'Fiador', style: 'header' },
                            { text: 'Telefono', style: 'header' }
                        ],
                    ]
                },
                margin: [SIZE_EXPORT, 0, 10, 0]
            },
        ],
        styles: {
            header: {
                fontSize: 7,
                bold: true,
                italics: true,
                fillColor: "#f9f9f9"
            },
            tableBody: {
                alignment: 'right',
                fontSize: 7,
            }
        }
    };

    data.forEach((x) => {
        const entries = Object.entries(x.creditos_renovaciones);
        let color = ''
        switch (true) {
            case x.mora >= 5 && x.mora <= 9:
                color = '#FBF462';
                break;
            case x.mora >= 10 && x.mora <= 19:
                color = '#F1775C';
                break;
            case x.mora >= 20:
                color = '#A25EEA';
                break;
        }
        docDefinition.content[1].table.body.push(
            [
                { text: entries.length > 0 ? '#' + entries.length : '', style: 'tableBody' },
                { text: x.orden, style: 'tableBody' },
                { text: x.obs_dia, style: 'tableBody' },
                { text: x.cliente.titular, style: 'tableBody' },
                { text: x.cuota, style: 'tableBody' },
                { text: x.mora, style: 'tableBody', fillColor: color },
                { text: x.cuotas_pagas, style: 'tableBody' },
                { text: x.valor_prestamo / 1000, style: 'tableBody' },
                { text: x.mod_dias + "-" + (x.mod_cuota / 1000), style: 'tableBody' },
                { text: x.saldo / 1000, style: 'tableBody' },
                { text: !x.fecha_ultimo_pago ? "" : moment(x.fecha_ultimo_pago).format("YYYY-MM-DD"), style: 'tableBody' },
                { text: x.valor_ultimo_pago / 1000, style: 'tableBody' },
                { text: moment(x.inicio_credito).format("YYYY-MM-DD"), style: 'tableBody' },
                { text: x.cliente.neg_titular, style: 'tableBody' },
                { text: x.cliente.dir_cobro, style: 'tableBody' },
                { text: x.cliente.tel_cobro, style: 'tableBody' },
                { text: x.cliente.fiador, style: 'tableBody' },
                { text: x.cliente.tel_fiador, style: 'tableBody' }
            ]
        )
    })

    pdfMake.createPdf(docDefinition).download("Listado Ruta-" + ruta + "; del " + moment().format("YYYY-MM-DD"));
}

function getValorModalidadDia(list, tipo, dates) {
    let ret = 0;
    dates.map(fecha => {
        var data = list.filter(item => moment(item.get('fecha')).format('YYYY-MM-DD') === fecha)
        if (data !== undefined) {
            data.map((item) => {

                if (tipo == 1) {
                    ret = item.get("total_creditos_dia") > 0 ? item.get("total_creditos_dia") : ret;
                }
                else
                    ret = item.get("total_creditos_dia") > 0 ? item.get("total_creditos_sem") : ret
            })
        }
    })
    return ret;
}

function getCoteo(list, fecha) {
    let ret = 0;
    var data = list.filter(item => moment(item.get('fecha')).format('YYYY-MM-DD') === fecha)
    if (data !== undefined) {
        data.map((item) => {
            ret = ret + item.get("coteos_dia")
        })
    }
    return ret;
}

export function exportCoteos(list, dates) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
        
    // PRIMER RECUADRO
    const dates1 = dates.slice(0, 10);
    const columnsHeaderDate1 = [
        { text: 'COBRADOR', style: 'header', rowSpan: 2 },
        { text: 'CLIENTES CORTE 1', style: 'header', colSpan: 2 },
        {}
    ]

    const columnsHeaderDate1_ = [
        {},
        { text: 'DIARIOS', style: 'header' },
        { text: 'SEMANALES', style: 'header' }
    ]

    dates1.map(x => {
        columnsHeaderDate1.push({ text: x, style: 'header' })
        columnsHeaderDate1_.push({ text: "COTEO", style: 'header' })
    })

    columnsHeaderDate1.push({ text: 'COTEADO', style: 'header', rowSpan: 2 })
    columnsHeaderDate1.push({ text: 'QUEDADO', style: 'header', rowSpan: 2 })
    columnsHeaderDate1_.push({});
    columnsHeaderDate1_.push({});

    // SEGUNDO RECUADRO
    const dates2 = dates.slice(10, 20);
    const columnsHeaderDate2 = [
        { text: 'COBRADOR', style: 'header', rowSpan: 2 },
        { text: 'CLIENTES CORTE 2', style: 'header', colSpan: 2 },
        {}
    ]

    const columnsHeaderDate2_ = [
        {},
        { text: 'DIARIOS', style: 'header' },
        { text: 'SEMANALES', style: 'header' }
    ]

    dates2.map(x => {
        columnsHeaderDate2.push({ text: x, style: 'header' })
        columnsHeaderDate2_.push({ text: "COTEO", style: 'header' })
    })

    columnsHeaderDate2.push({ text: 'COTEADO', style: 'header', rowSpan: 2 })
    columnsHeaderDate2.push({ text: 'QUEDADO', style: 'header', rowSpan: 2 })
    columnsHeaderDate2_.push({});
    columnsHeaderDate2_.push({});

    // TERCER RECUADRO
    const dates3 = dates.slice(20);
    const columnsHeaderDate3 = [
        { text: 'COBRADOR', style: 'header', rowSpan: 2 },
        { text: 'CLIENTES CORTE 3', style: 'header', colSpan: 2 },
        {}
    ]

    const columnsHeaderDate3_ = [
        {},
        { text: 'DIARIOS', style: 'header' },
        { text: 'SEMANALES', style: 'header' }
    ]

    dates3.map(x => {
        columnsHeaderDate3.push({ text: x, style: 'header' })
        columnsHeaderDate3_.push({ text: "COTEO", style: 'header' })
    })

    columnsHeaderDate3.push({ text: 'COTEADO', style: 'header', rowSpan: 2 })
    columnsHeaderDate3.push({ text: 'QUEDADO', style: 'header', rowSpan: 2 })
    columnsHeaderDate3_.push({});
    columnsHeaderDate3_.push({});

    var docDefinition = {
        pageSize: 'LEGAL',
        pageOrientation: 'landscape',
        pageMargins: [20, 20, 20, 20],
        content: [
            {
                table: {
                    headerRows: 2,
                    widths: 'auto',
                    body: [
                        columnsHeaderDate1,
                        columnsHeaderDate1_

                    ]
                },
                margin: [SIZE_EXPORT, 10, 10, 0]
            },
            {
                table: {
                    headerRows: 2,
                    widths: 'auto',
                    body: [
                        columnsHeaderDate2,
                        columnsHeaderDate2_

                    ]
                },
                margin: [SIZE_EXPORT, 10, 10, 0]
            },
            {
                table: {
                    headerRows: 2,
                    widths: 'auto',
                    body: [
                        columnsHeaderDate3,
                        columnsHeaderDate3_

                    ]
                },
                margin: [SIZE_EXPORT, 10, 10, 0]
            }
        ],
        styles: {
            header: {
                fontSize: 7,
                bold: true,
                italics: true,
                fillColor: "#f9f9f9"
            },
            tableBody: {
                alignment: 'right',
                fontSize: 7,
            }
        }
    };

    list.map((x) => {
        let coteado = 0;
        let diarios = getValorModalidadDia(x.get("coteos"), 1, dates1);
        let semanales = getValorModalidadDia(x.get("coteos"), 2, dates1);

        const rows = [
            { text: x.get("nombres") + " " + x.get("apellidos"), style: 'tableBody' },
            { text: diarios, style: 'tableBody' },
            { text: semanales, style: 'tableBody' }
        ]

        dates1.map((item) => {
            const rest = getCoteo(x.get("coteos"), item);
            coteado = coteado + rest;
            rows.push({ text: rest, style: 'tableBody' })
        })

        rows.push({ text: coteado, style: 'tableBody' })
        rows.push({ text: ((diarios * 8) + semanales) - coteado, style: 'tableBody' })

        docDefinition.content[0].table.body.push(rows)
    })

    list.map((x) => {
        let coteado = 0;
        let diarios = getValorModalidadDia(x.get("coteos"), 1, dates2);
        let semanales = getValorModalidadDia(x.get("coteos"), 2, dates2);

        const rows = [
            { text: x.get("nombres") + " " + x.get("apellidos"), style: 'tableBody' },
            { text: diarios, style: 'tableBody' },
            { text: semanales, style: 'tableBody' }
        ]

        dates2.map((item) => {
            const rest = getCoteo(x.get("coteos"), item);
            coteado = coteado + rest;
            rows.push({ text: rest, style: 'tableBody' })
        })

        rows.push({ text: coteado, style: 'tableBody' })
        rows.push({ text: ((diarios * 8) + semanales) - coteado, style: 'tableBody' })

        docDefinition.content[1].table.body.push(rows)
    })

    list.map((x) => {
        let coteado = 0;
        let diarios = getValorModalidadDia(x.get("coteos"), 1, dates3);
        let semanales = getValorModalidadDia(x.get("coteos"), 2, dates3);

        const rows = [
            { text: x.get("nombres") + " " + x.get("apellidos"), style: 'tableBody' },
            { text: diarios, style: 'tableBody' },
            { text: semanales, style: 'tableBody' }
        ]

        dates3.map((item) => {
            const rest = getCoteo(x.get("coteos"), item);
            coteado = coteado + rest;
            rows.push({ text: rest, style: 'tableBody' })
        })

        rows.push({ text: coteado, style: 'tableBody' })
        rows.push({ text: ((diarios * 8) + semanales) - coteado, style: 'tableBody' })

        docDefinition.content[2].table.body.push(rows)
    })
    
    console.log(docDefinition.content);

    pdfMake.createPdf(docDefinition).download("Reporte de coteos del " + moment().format("YYYY-MM-DD"));
}

export function exportAbonos(list) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const data = list.toList().toJS();
    var docDefinition = {
        pageSize: 'LEGAL',
        pageOrientation: 'landscape',
        fontSize: 3,
        pageMargins: [10, 10, 10, 10],
        content: [
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', 'auto'],
                    body: [
                        [
                            { text: 'Fecha', style: 'header' },
                            { text: 'Abono', style: 'header' },
                            { text: 'Usuario', style: 'header' },
                        ],
                    ]
                },
            },
        ],
        styles: {
            header: {
                fontSize: 10,
                bold: true,
                italics: true
            },
            tableBody: {
                alignment: 'right',
                fontSize: 10,
            }
        }
    };

    data.forEach((x) => {
        docDefinition.content[0].table.body.push(
            [
                { text: moment(x.fecha_abono).format("YYYY-MM-DD"), style: 'tableBody' },
                { text: x.abono, style: 'tableBody' },
                { text: x.user.nombres + " " + x.user.apellidos, style: 'tableBody' }
            ]
        )
    })
    pdfMake.createPdf(docDefinition).download("Abonos - " + moment().format("YYYY-MM-DD"));
}

export const operators = [
    { id: 1, value: '===', caption: 'Igual a', comparisons: ['VARCHAR2', 'NUMBER', 'DATE'] },
    { id: 2, value: '!==', caption: 'Diferente de', comparisons: ['VARCHAR2', 'NUMBER', 'DATE'] },
    { id: 3, value: '>', caption: 'Mayor a', comparisons: ['NUMBER', 'DATE'] },
    { id: 4, value: '>=', caption: 'Mayor o igual a', comparisons: ['NUMBER', 'DATE'] },
    { id: 5, value: '<', caption: 'Menor a', comparisons: ['NUMBER', 'DATE'] },
    { id: 6, value: '<=', caption: 'Menor o igual a', comparisons: ['NUMBER', 'DATE'] },
    { id: 7, value: 'like', caption: 'Contiene', comparisons: ['VARCHAR2', 'DATE'] },
    { id: 8, value: 'in', caption: 'En', comparisons: ['VARCHAR2', 'NUMBER'] },
    { id: 9, value: 'between', caption: 'Entre', comparisons: ['DATE', 'NUMBER'] },
]


export function createModalFilterFunction(c) {
    const d = {
        '===': (a, b1) => a === b1,
        '!==': (a, b1) => a !== b1,
        '>': (a, b1) => a > b1,
        '>=': (a, b1) => a >= b1,
        '<': (a, b1) => a < b1,
        '<=': (a, b1) => a <= b1,
        like: (a, b1) => -1 !== (a + '').toUpperCase().indexOf((b1 + '').toUpperCase()),
        in: (a, b1) => { console.log(b1); return (b1.split(',').map(x => x.trim())).indexOf(a) !== -1 },
        in_numeric: (a, b1) => (b1.split(',').map(x => Number(x.trim()))).indexOf(a) !== -1,
        between: (a, b1, b2) => a >= b1 && a <= b2
    };

    switch (c.get('comparison')) {
        case 'number':
            return f => {
                const g = f[c.get('column')]
                let h, i
                if (c.get('operator') !== 'in') {
                    h = isNaN(c.get('value')) ? 0 : c.get('value')
                    i = isNaN(c.get('value1')) ? 0 : c.get('value1')
                    return d[c.get('operator')](g, +h, +i)
                } else {
                    h = (c.get('value') || '').replace(/\s/g, '')
                    i = (c.get('value1') || '').replace(/\s/g, '')
                    return d['in_numeric'](g, h, i)
                }
            }
        case 'string':
            return f => {
                const immF = Immutable.fromJS(f)
                const g = immF.getIn(c.get('column').split('.'))
                let h = c.get('value')
                let i = c.get('value1')
                return d[c.get('operator')]((g + '').toUpperCase(), (h + '').toUpperCase(), (i + '').toUpperCase())
            }
        default:
            return f => {
                const g = f[c.get('column')]
                const h = c.get('value')
                const i = c.get('value1')
                return d[c.get('operator')]((g + '').toUpperCase(), (h + '').toUpperCase(), (i + '').toUpperCase())
            }
    }
}