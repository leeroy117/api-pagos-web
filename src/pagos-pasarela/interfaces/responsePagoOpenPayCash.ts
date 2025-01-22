export interface ITransactionOpenPayCash {
    id: string;
    authorization: string | null;
    operation_type: string; // e.g., "in"
    transaction_type: string; // e.g., "charge"
    status: string; // e.g., "in_progress"
    conciliated: boolean;
    creation_date: string; // ISO 8601 format
    operation_date: string; // ISO 8601 format
    description: string;
    error_message: string | null;
    order_id: string;
    due_date: string; // ISO 8601 format
    payment_method: IPaymentMethod;
    amount: number;
    currency: string; // e.g., "MXN"
    customer: ICustomer;
    method: string; // e.g., "store"
  }
  
interface IPaymentMethod {
    type: string; // e.g., "store"
    reference: string;
    barcode_url: string;
    url_store: string;
}
  
interface ICustomer {
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string | null;
    creation_date: string; // ISO 8601 format
    external_id: string | null;
    clabe: string | null;
}
  