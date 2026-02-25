export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
}

export interface ApiErrorResponse {
    success: boolean;
    statusCode: number;
    error: string;
    message: string | string[];
    path: string;
    method: string;
    timestamp: string;
}
