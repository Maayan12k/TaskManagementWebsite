
import { SignUpStep } from "../../constants-styles";
import { isClerkAPIResponseError } from "./SignUpModel";

export const handleSignUp = async (
    email: string,
    password: string,
    setCurrentStep: React.Dispatch<React.SetStateAction<SignUpStep>>,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    clerk: any,
): Promise<void> => {
    try {
        await clerk.client.signUp.create({ emailAddress: email, password });
        await clerk.client.signUp.prepareEmailAddressVerification();
        setCurrentStep(SignUpStep.Verification);
    } catch (error) {
        console.error(JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
            setIsError(true);
            setErrorMessage(error.errors[0].longMessage);
        } else {
            setIsError(true);
            setErrorMessage('An unexpected error occurred.');
        }
    }
};
