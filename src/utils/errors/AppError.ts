export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Resource not found") {
        super(message, 404);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = "Bad request") {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized") {
        super(message, 401);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = "Internal server error") {
        super(message, 500);
    }
} 