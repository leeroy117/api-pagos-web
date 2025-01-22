export interface ICreateWebHook {
    id?: string;
    url: string;
    user: string;
    password: string;
    event_types: string[];
    status?: string;
  }