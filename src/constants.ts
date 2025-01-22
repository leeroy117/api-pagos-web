


if(!process.env.DO_SSH_USERNAME){
    throw new Error('Variable no encontrada');
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
export const DATA_SOURCE  = 'DATA_SOURCE';


export const DO_DB_HOST = process.env.DO_DB_HOST;
export const DO_DB_USERNAME = process.env.DO_DB_USERNAME;
export const DO_DB_PASSWORD = process.env.DO_DB_PASSWORD;
export const DO_DB = process.env.DO_DB;
export const DO_DB_PORT = process.env.DO_DB_PORT;

export const DO_SSH_USERNAME = process.env.DO_SSH_USERNAME;
export const DO_SSH_PASSWORD = process.env.DO_SSH_PASSWORD;
export const DO_SSH_HOST = process.env.DO_SSH_HOST;
export const DO_SSH_PORT = process.env.DO_SSH_PORT;