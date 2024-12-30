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

export interface ClerkAPIErrorResponse {
    status: number;
    clerkError: boolean;
    errors: ClerkAPIError[];
}

export interface Item {
    title: string;
    description: string;
    status: string;
};