export interface ITransactionOpenPayCard {
    id: string;
    authorization: string;
    operation_type: string;
    transaction_type: string;
    status: string;
    conciliated: boolean;
    creation_date: string; // ISO 8601 format
    operation_date: string; // ISO 8601 format
    description: string;
    error_message: string | null;
    order_id: string;
    card: ICardDetails;
    gateway_card_present: string;
    amount: number;
    customer: ICustomerDetails;
    fee: IFeeDetails;
    currency: string;
    method: string;
}

interface ICardDetails {
    type: string;
    brand: string;
    address: string | null;
    card_number: string;
    holder_name: string;
    expiration_year: string;
    expiration_month: string;
    allows_charges: boolean;
    allows_payouts: boolean;
    bank_name: string;
    card_business_type: string | null;
    dcc: string | null;
    bank_code: string;
}

interface ICustomerDetails {
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string | null;
    creation_date: string; // ISO 8601 format
    external_id: string | null;
    clabe: string | null;
}

interface IFeeDetails {
    amount: number;
    tax: number;
    surcharge: number | null;
    base_commission: number | null;
    currency: string;
}
