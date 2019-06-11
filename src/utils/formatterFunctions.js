// export const DetallesFormatter = ({ row }) => {
//     return row.cliente.titular;
// };

export const ClienteFormatter = ({ row }) => {
    return row.cliente.titular;
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