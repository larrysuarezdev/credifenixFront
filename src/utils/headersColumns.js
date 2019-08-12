export const tableColumnsUsuarios = [
    { ID: 0, CAPTION: '', VALUE: '', TYPE: '', FORMAT: '', WIDTH: 20, FIXED: true },
    { ID: 1, CAPTION: 'Nombres', VALUE: 'nombres', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: true },
    { ID: 2, CAPTION: 'Apellidos', VALUE: 'apellidos', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: false },
    { ID: 3, CAPTION: 'Telefono', VALUE: 'telefono1', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: false },
    { ID: 3, CAPTION: 'Auth?', VALUE: 'login', TYPE: 'BOOLEAN', FORMAT: '', WIDTH: 80, FIXED: false },
    { ID: 4, CAPTION: 'Creado', VALUE: 'created_at', TYPE: 'DATE', FORMAT: 'YYYY-MM-DD', WIDTH: 110, FIXED: false },
]

export const tableColumnsClientes = [
    { ID: 0, CAPTION: '', VALUE: 'eye', TYPE: 'BUTTON', FORMAT: '', WIDTH: 30, FIXED: true },
    { ID: 1, CAPTION: '', VALUE: 'user-edit', TYPE: 'BUTTON1', FORMAT: '', WIDTH: 30, FIXED: true },
    { ID: 2, CAPTION: 'Titular', VALUE: 'titular', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 250, FIXED: true },
    { ID: 3, CAPTION: 'Estado', VALUE: 'estado', TYPE: 'BOOLEAN', FORMAT: '', WIDTH: 80, FIXED: false },
    { ID: 4, CAPTION: 'Fiador', VALUE: 'fiador', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: false },
    { ID: 5, CAPTION: 'Identificación  fiador', VALUE: 'cc_fiador', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: false },
    { ID: 6, CAPTION: 'Negocio titular', VALUE: 'neg_titular', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: false },
    { ID: 7, CAPTION: 'Negocio fiador', VALUE: 'neg_fiador', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: false },
    { ID: 8, CAPTION: 'Dirección cobro', VALUE: 'dir_cobro', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 250, FIXED: false },
    { ID: 9, CAPTION: 'Barrio cobro', VALUE: 'barrio_cobro', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 200, FIXED: false },
    { ID: 10, CAPTION: 'Dirección casa', VALUE: 'dir_casa', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 250, FIXED: false },
    { ID: 11, CAPTION: 'Barrio casa', VALUE: 'barrio_casa', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 200, FIXED: false },
    { ID: 12, CAPTION: 'Telefono casa', VALUE: 'tel_casa', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: false },
    { ID: 13, CAPTION: 'Dirección fiador', VALUE: 'dir_fiador', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 250, FIXED: false },
    { ID: 14, CAPTION: 'Barrio fiador', VALUE: 'barrio_fiador', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 200, FIXED: false },
    { ID: 15, CAPTION: 'Telefono fiador', VALUE: 'tel_fiador', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: false },
    { ID: 16, CAPTION: 'Identificación  titular', VALUE: 'cc_titular', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: false },
]

export const tableColumnsDetallesAbonos = [
    { ID: 0, CAPTION: '', VALUE: '', TYPE: '', FORMAT: '', WIDTH: 20, FIXED: true },
    { ID: 1, CAPTION: 'Abono', VALUE: 'abono', TYPE: 'NUMBER', FORMAT: '', WIDTH: 100, FIXED: true },
    { ID: 2, CAPTION: 'Fecha', VALUE: 'fecha_abono', TYPE: 'DATE', FORMAT: 'YYYY-MM-DD', WIDTH: 120, FIXED: false },
    { ID: 3, CAPTION: 'Usuario', VALUE: 'user.nombres', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 226, FIXED: false },
]

export const tableColumnsDetallesRenovaciones = [
    { ID: 0, CAPTION: '', VALUE: '', TYPE: '', FORMAT: '', WIDTH: 20, FIXED: true },
    { ID: 1, CAPTION: 'Observación', VALUE: 'observaciones', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 200, FIXED: false },
    { ID: 2, CAPTION: 'Fecha', VALUE: 'fecha', TYPE: 'DATE', FORMAT: 'YYYY-MM-DD', WIDTH: 120, FIXED: false },
    { ID: 3, CAPTION: 'Estado', VALUE: 'estado', TYPE: 'BOOLEAN', FORMAT: '', WIDTH: 100, FIXED: false },
]

export const tableColumnsReferenciasCliente = [
    { ID: 0, CAPTION: '', VALUE: 'eye', TYPE: 'BUTTON', FORMAT: '', WIDTH: 20, FIXED: true },
    { ID: 1, CAPTION: 'Nombre', VALUE: 'nombre', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: true },
    { ID: 2, CAPTION: 'Dirección', VALUE: 'direccion', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 180, FIXED: false },
    { ID: 3, CAPTION: 'Barrio', VALUE: 'barrio', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 150, FIXED: false },
    { ID: 4, CAPTION: 'Telefono', VALUE: 'telefono', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 100, FIXED: false },
    { ID: 5, CAPTION: 'Parentesco', VALUE: 'parentesco', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 100, FIXED: false },
]

export const tableColumnsFlujoCaja = [
    { ID: 0, CAPTION: '', VALUE: '', TYPE: 'BUTTON', FORMAT: '', WIDTH: 20, FIXED: true },
    { ID: 1, CAPTION: 'Descripción', VALUE: 'descripcion', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 250, FIXED: true },
    { ID: 2, CAPTION: 'Tipo', VALUE: 'tipo', TYPE: 'VARCHAR3', FORMAT: '', WIDTH: 100, FIXED: false },
    { ID: 3, CAPTION: 'Fecha', VALUE: 'fecha', TYPE: 'DATE', FORMAT: 'YYYY-MM-DD', WIDTH: 160, FIXED: false },
    { ID: 4, CAPTION: 'Valor', VALUE: 'valor', TYPE: 'NUMBER', FORMAT: '', WIDTH: 150, FIXED: false },
]

export const tableColumnsFlujoUtilidades = [
    { ID: 0, CAPTION: '', VALUE: '', TYPE: 'BUTTON', FORMAT: '', WIDTH: 20, FIXED: true },
    { ID: 1, CAPTION: 'Descripción', VALUE: 'descripcion', TYPE: 'VARCHAR2', FORMAT: '', WIDTH: 250, FIXED: true },
    { ID: 3, CAPTION: 'Fecha', VALUE: 'fecha', TYPE: 'DATE', FORMAT: 'YYYY-MM-DD', WIDTH: 160, FIXED: false },
    { ID: 4, CAPTION: 'Valor', VALUE: 'valor', TYPE: 'NUMBER', FORMAT: '', WIDTH: 150, FIXED: false },
]

export const tableColumnsRutas = [
    { ID: 0, VALUE : 'orden', CAPTION: 'Orden', editable: false, width: 60, frozen: true },
    { ID: 1, VALUE : 'cliente.titular', CAPTION: 'Cliente', editable: false, width: 200 },
    { ID: 3, VALUE : 'mora', CAPTION: 'Mora', editable: false, width: 50, frozen: true },
    { ID: 5, VALUE : 'valor_prestamo', CAPTION: 'Prestamo', editable: false, width: 100 },
    { ID: 6, VALUE : 'mod_cuota', CAPTION: 'Cuota', editable: false, width: 80 },
    { ID: 7, VALUE : 'mod_dias', CAPTION: 'Días', editable: false, width: 50 },
    { ID: 8, VALUE : 'saldo', CAPTION: 'Saldo', editable: false, width: 100 },
    { ID: 9, VALUE : 'valor_total', CAPTION: 'Total', editable: false, width: 100 },
    { ID: 10, VALUE : 'valor_ultimo_pago', CAPTION: 'Valor ult pag', editable: false, width: 110 },
    { ID: 11, VALUE : 'fecha_ultimo_pago', CAPTION: 'Fecha ult pag', editable: false, width: 110 },
    { ID: 12, VALUE : 'inicio_credito', CAPTION: 'Inicio', editable: false, width: 120 },
    { ID: 13, VALUE : 'neg_titular', CAPTION: 'Negocio', editable: false, width: 200 },
    { ID: 14, VALUE : 'dir_titular', CAPTION: 'Dirección', editable: false, width: 200 },
    { ID: 15, VALUE : 'telefono', CAPTION: 'Telefono', editable: false, width: 200 },
    { ID: 16, VALUE : 'fiador', CAPTION: 'Fiador', editable: false, width: 200 },
    { ID: 17, VALUE : 'tel_fiador', CAPTION: 'Telefono', editable: false, width: 200 },
];