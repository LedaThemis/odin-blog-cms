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
    userId?: string;
};

export interface APIUser {
    _id: string;
    username: string;
}

export type PostType = {
    _id: string;
    title: string;
    author: APIUser;
    content: string;
    comments: string[];
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

type PostsSuccessResponse = {
    posts?: PostType[];
};

export type PostsResponse = PostsSuccessResponse & FailResponse;

export type AccessResponse = AccessSuccessResponse & FailResponse;

export interface PostInput {
    title?: string;
    content?: string;
}

export type CreatePostResponse = PostType & FailResponse;
