export interface IPagoPasarelaInfoAlumno {
    idmoodle_alumno: number;
    id_plan_estudio: number;
    servicio: IServicio;
    id_moodle_materia: number;
    id_alumno: number;
}

export interface IServicio {
    id: number;
    id_tipo: number;
    nombre: string;
}

export interface IChargeRequestCard {
    source_id: string; // ID del token de la tarjeta
    method: string; // Método de pago, por ejemplo, "card"
    amount: number; // Monto del cargo
    currency: string; // Moneda del cargo, como "MXN"
    description?: string; // Descripción del cargo
    order_id: string; // ID opcional del pedido
    device_session_id: string; // ID de sesión del dispositivo
    customer: Customer; // Objeto con los datos del cliente
}

export interface IChargeRequestCash {
    method: string; // Método de pago, por ejemplo, "card"
    amount: number; // Monto del cargo
    description: string; // Descripción del cargo
    order_id?: string; // ID opcional del pedido
    due_date: Date; // Objeto con los datos del cliente
    customer: Customer;
}

export interface IChargeRequestBank {
    method: string; // Método de pago, por ejemplo, "card"
    amount: number; // Monto del cargo
    description: string; // Descripción del cargo
    order_id: string; // ID opcional del pedido
    customer: Customer;
}
  
export interface Customer {
    name: string; // Nombre del cliente
    last_name: string; // Apellidos del cliente
    phone_number: string; // Número de teléfono del cliente
    email: string; // Correo electrónico del cliente
}