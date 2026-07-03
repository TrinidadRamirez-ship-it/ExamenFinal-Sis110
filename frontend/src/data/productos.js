import {
  BadgeDollarSign,
  Boxes,
  Calculator,
  FileCheck2,
  Landmark,
  UsersRound
} from 'lucide-react';

export const productos = [
  {
    slug: 'contabilidad',
    nombre: 'Contabilidad',
    resumen: 'Registro contable bimonetario, comprobantes, balances y reportes listos para analizar.',
    descripcion:
      'Centraliza los movimientos contables de la empresa y genera informacion financiera ordenada para la toma de decisiones.',
    icono: Calculator,
    color: 'teal',
    funciones: [
      'Plan de cuentas configurable',
      'Comprobantes de ingreso, egreso y traspaso',
      'Libro diario, mayor y balance de comprobacion',
      'Reportes en bolivianos y dolares',
      'Exportacion de informacion a Excel'
    ]
  },
  {
    slug: 'inventarios',
    nombre: 'Inventarios',
    resumen: 'Control de almacenes, existencias, movimientos y valoracion de productos.',
    descripcion:
      'Permite conocer el stock disponible, el valor del inventario y el historial de movimientos por almacen.',
    icono: Boxes,
    color: 'yellow',
    funciones: [
      'Catalogo de items y categorias',
      'Ingresos, salidas y transferencias',
      'Kardex fisico valorado',
      'Alertas de stock minimo',
      'Gestion de proveedores y clientes'
    ]
  },
  {
    slug: 'planillas',
    nombre: 'Planillas',
    resumen: 'Gestion de sueldos, descuentos, bonos, aguinaldos y obligaciones laborales.',
    descripcion:
      'Automatiza el calculo mensual de planillas y prepara reportes para trabajadores e instituciones.',
    icono: UsersRound,
    color: 'blue',
    funciones: [
      'Ficha laboral de trabajadores',
      'Calculo de ingresos y descuentos',
      'Papeletas de pago',
      'Planillas de aguinaldo',
      'Reportes para AFP y Ministerio de Trabajo'
    ]
  },
  {
    slug: 'facturacion',
    nombre: 'Facturacion',
    resumen: 'Emision, control y seguimiento de facturas y ventas de la empresa.',
    descripcion:
      'Agiliza la atencion al cliente mediante comprobantes de venta, reportes y control por sucursal.',
    icono: FileCheck2,
    color: 'green',
    funciones: [
      'Emision de facturas',
      'Registro de clientes y productos',
      'Control por sucursal y punto de venta',
      'Reportes de ventas',
      'Anulaciones y seguimiento de comprobantes'
    ]
  },
  {
    slug: 'activos-fijos',
    nombre: 'Activos fijos',
    resumen: 'Administracion de bienes, responsables, ubicaciones y depreciaciones.',
    descripcion:
      'Mantiene el inventario patrimonial actualizado y documenta cada cambio durante la vida util del activo.',
    icono: Landmark,
    color: 'coral',
    funciones: [
      'Registro y codificacion de activos',
      'Asignacion de responsables',
      'Actualizacion por UFV',
      'Calculo de depreciacion',
      'Altas, bajas y transferencias'
    ]
  },
  {
    slug: 'cuentas-por-cobrar',
    nombre: 'Cuentas por cobrar',
    resumen: 'Seguimiento de saldos, vencimientos, pagos y compromisos de clientes.',
    descripcion:
      'Ofrece visibilidad de la cartera para priorizar cobranzas y mantener un flujo de caja saludable.',
    icono: BadgeDollarSign,
    color: 'violet',
    funciones: [
      'Cartera por cliente',
      'Calendario de vencimientos',
      'Registro de pagos parciales',
      'Estados de cuenta',
      'Reportes de mora y recuperacion'
    ]
  }
];

export function buscarProducto(slug) {
  return productos.find((producto) => producto.slug === slug);
}
