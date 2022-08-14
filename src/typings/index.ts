export type ErrorType = {
    msg: string;
    location?: string;
    param?: string;
    value?: string;
};

export type User = {
    token?: string;
};

export type AccessDetails = {
    username: string;
    password: string;
};

type FailResponse = {
    errors?: ErrorType[];
};

type AccessSuccessResponse = {
    token?: string;
    expiresIn?: string;
};

export type AccessResponse = AccessSuccessResponse & FailResponse;
