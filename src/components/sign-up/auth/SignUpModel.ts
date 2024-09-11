import { ClerkAPIErrorResponse } from "./types";

export const validateFirstName = (value: string): string => {
    return value ? '' : 'First name is required';
};

export const validateLastName = (value: string): string => {
    return value ? '' : 'Last name is required';
};

export const validateEmail = (value: string): string => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailPattern.test(value)) return 'Enter a valid email address';
    return '';
};

export const validatePassword = (value: string): string => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) return 'Confirm password is required';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
};

export const isClerkAPIResponseError = (error: any): error is ClerkAPIErrorResponse => {
    return error.clerkError;
};
