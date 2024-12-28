import { ClerkAPIErrorResponse } from "../../constants-styles-types/types";

export interface SignInModelProps {
    email: string;
    password: string;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    navigate: (path: string) => void;
    clerk: any;
}

const isClerkAPIResponseError = (error: any): error is ClerkAPIErrorResponse => {
    return error.clerkError;
};

export const handleSignIn = async ({
    email,
    password,
    setIsError,
    setErrorMessage,
    navigate,
    clerk,
}: SignInModelProps): Promise<void> => {

    try {
        const signInAttempt = await clerk.client.signIn.create({
            identifier: email,
            password,
        });

        if (signInAttempt.status === "complete") {
            await clerk.setActive({ session: signInAttempt.createdSessionId });
        } else {
            console.error(JSON.stringify(signInAttempt, null, 2));
        }
    } catch (error) {
        console.error(JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
            setIsError(true);
            setErrorMessage(error.errors[0].longMessage);
        }
    }
};