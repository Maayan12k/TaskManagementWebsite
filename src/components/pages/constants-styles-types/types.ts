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
export enum TaskStatus {
    BACKLOG = "BACKLOG",
    IN_PROGRESS = "IN PROGRESS",
    COMPLETED = "COMPLETED",
}

export interface Task {
    title: string;
    description: string;
    status: TaskStatus;
    id: number;
}

export interface Project {
    title: string;
    description: string;
    tasks: Task[];
    id: number;
}