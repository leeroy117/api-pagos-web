interface IPaymentMethodOpenPayWebHook {
    type: string;
    reference: string;
    barcode_url: string;
    url_store: string;
  }
  
  interface ICustomerOpenPayWebHook {
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string | null;
    external_id: string | null;
    clabe: string | null;
  }
  
  interface IFee {
    amount: number;
    tax: number;
    surcharge: number | null;
    base_commission: number | null;
    currency: string;
  }
  
  interface ITransactionOpenPayWebHook {
    id: string;
    authorization: string;
    operation_type: string;
    transaction_type: string;
    status: string;
    conciliated: boolean;
    description: string;
    error_message: string | null;
    order_id: string;
    due_date: string;
    payment_method: IPaymentMethodOpenPayWebHook;
    amount: number;
    currency: string;
    customer: ICustomerOpenPayWebHook;
    fee: IFee;
    method: string;
    creation_date: Date;
    operation_date: Date;
  }
  
export interface IChargeOpenPayWebHook {
    type: string;
    transaction: ITransactionOpenPayWebHook;
  }
  