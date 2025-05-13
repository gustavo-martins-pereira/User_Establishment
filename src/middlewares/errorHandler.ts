import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "@utils/errors/AppError.ts";

interface ErrorResponse {
    status: string;
    message: string;
    stack?: string;
}

export const errorHandler: ErrorRequestHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
): void => {
    if(error instanceof AppError) {
        const errorResponse: ErrorResponse = {
            status: "error",
            message: error.message
        };

        if(process.env.NODE_ENV === "development") {
            errorResponse.stack = error.stack;
        }

        response.status(error.statusCode).json(errorResponse);
        return;
    }

    console.error("Unexpected error:", error);
    
    const errorResponse: ErrorResponse = {
        status: "error",
        message: "Internal server error"
    };

    if(process.env.NODE_ENV === "development") {
        errorResponse.stack = error.stack;
    }

    response.status(500).json(errorResponse);
};
