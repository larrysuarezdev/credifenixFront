import axios from 'axios'
import { Cookies } from 'react-cookie';
import objectifyArray from 'objectify-array'
import Immutable from 'immutable'
import { API_URL } from '../actions/index'
import moment from 'moment'

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

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
        // console.log(x.creditos_detalles)
        if (x.creditos_detalles !== undefined) {
            const entries = Object.entries(x.creditos_detalles);
            entries.forEach(element => {
                abonos = abonos + element[1].abono
            });

            if (entries.length > 0) {
                const ultimoPago = entries.reduce(function (a, b) { return (a.id > b.id) ? a : b; });

                x.valor_ultimo_pago = ultimoPago[1].abono;
                x.fecha_ultimo_pago = ultimoPago[1].fecha_abono;
            } else {
                x.valor_ultimo_pago = 0;
                x.fecha_ultimo_pago = "";
            }
        }
        x.saldo = x.valor_total - abonos;
        x.cuotas_pagas = (x.valor_total - x.saldo) / x.mod_cuota
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

export function exportDataGrid(list) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const data = list.toList().toJS().sort(function (a, b) { return a.orden - b.orden });
    console.log(data)

    var docDefinition = {
        pageSize: 'A3',
        pageOrientation: 'landscape',
        fontSize: 5,
        pageMargins: [4, 4, 4, 4],
        content: [
            {
                table: {
                    headerRows: 1,
                    widths: [35, 'auto', 30, 30, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: [
                        [
                            { text: 'Orden', style: 'header' },
                            { text: 'Cliente', style: 'header' },
                            { text: 'Cuota', style: 'header' },
                            { text: 'Mora', style: 'header' },
                            { text: 'PAG', style: 'header' },
                            { text: 'Prestamo', style: 'header' },
                            { text: 'Cuota', style: 'header' },
                            { text: 'Dias', style: 'header' },
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
                { text : x.orden, style: 'tableBody'},
                { text : x.cliente.titular, style: 'tableBody'},
                { text : x.cuota, style: 'tableBody'},
                { text : x.mora, style: 'tableBody'},
                { text : x.cuotas_pagas, style: 'tableBody'},
                { text : x.valor_prestamo, style: 'tableBody'},
                { text : x.mod_cuota, style: 'tableBody'},
                { text : x.mod_dias, style: 'tableBody'},
                { text : x.saldo, style: 'tableBody'},
                { text : x.fecha_ultimo_pago == "" ? "" : moment(x.fecha_ultimo_pago).format("YYYY-MM-DD"), style: 'tableBody'},
                { text : x.valor_ultimo_pago, style: 'tableBody'},
                { text : moment(x.inicio_credito).format("YYYY-MM-DD"), style: 'tableBody'},
                { text : x.cliente.neg_titular, style: 'tableBody'},
                { text : x.cliente.dir_cobro, style: 'tableBody'},                
                { text : x.cliente.tel_cobro, style: 'tableBody'},                
                { text : x.cliente.fiador, style: 'tableBody'},                
                { text : x.cliente.tel_fiador, style: 'tableBody'}
            ]
        )
    })

    pdfMake.createPdf(docDefinition).download();
}