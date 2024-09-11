export interface ClerkAPIError {
    code: string;
    message: string;
    longMessage: string;
    meta?: {
        paramName?: string;
        sessionId?: string;
        emailAddresses?: string[];
        identifiers?: string[];
        zxcvbn?: {
            suggestions: {
                code: string;
                message: string;
            }[];
        };
        permissions?: string[];
    };
}

declare global {
    interface Window {
        Clerk: any;
    }
}

export interface ClerkAPIErrorResponse {
    status: number;
    clerkError: boolean;
    errors: ClerkAPIError[];
}