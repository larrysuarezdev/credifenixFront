import numeral from 'numeral'
import moment from 'moment'

export const TotalFormatter = ({ row }) => {
    return numeral(row.valor_total).format();
};

export const SaldoFormatter = ({ row }) => {
    return numeral(row.saldo).format();
};

export const CuotasFormatter = ({ row }) => {
    return numeral(row.mod_cuota).format();
};

export const PrestamoFormatter = ({ row }) => {
    return numeral(row.valor_prestamo).format();
};

export const NegocioFormatter = ({ row }) => {
    return row.cliente.neg_titular;
};

export const DireccionFormatter = ({ row }) => {
    return row.cliente.dir_cobro;
};

export const TelefonoClienteFormatter = ({ row }) => {
    return row.cliente.tel_cobro;
};

export const FiadorFormatter = ({ row }) => {
    return row.cliente.fiador;
};

export const TelefonoFiadorFormatter = ({ row }) => {
    return row.cliente.tel_fiador;
};

export const ValorUltimoPagoFormatter = ({ row }) => {
    return numeral(row.valor_ultimo_pago).format();
};

export const FechaUltimoPagoFormatter = ({ row }) => {
    return row.fecha_ultimo_pago == "" ? "" : moment(row.fecha_ultimo_pago).format("YYYY-MM-DD");
};