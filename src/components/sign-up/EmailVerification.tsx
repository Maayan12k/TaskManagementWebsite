import { Alert, Box, Button, Container, Form, FormField, Input, SpaceBetween } from "@cloudscape-design/components"
import { SpaceBetweenDirection, SpaceBetweenSize } from "../constants-styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "./auth/SignUpModel";

export const EmailVerification = (): JSX.Element => {
    const [emailVerificationCode, setEmailVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const Header = (): JSX.Element => (
        <Box>
            <h1>Verify</h1>
        </Box>
    );

    const handleSubmit = async () => {
        console.log('Email Verification Code:', emailVerificationCode);
        setLoading(true);

        try {
            const verify = await window.Clerk.client.signUp.attemptEmailAddressVerification({ emailVerificationCode });
            await window.Clerk.setActive({ session: verify.createdSessionId });
            const { user, isSignedIn } = useUser();
            if (isSignedIn) {
                navigate('/dashboard/' + user.id);
            }

        } catch (error) {
            console.error(JSON.stringify(error, null, 2));
            if (isClerkAPIResponseError(error)) {
                setIsError(true);
                if (error.errors[0].longMessage == 'email_verification_code is not a valid parameter for this request.')
                    setErrorMessage("Invalid verification code. Please try again.");
                else
                    setErrorMessage(error.errors[0].longMessage);
            }
            setLoading(false);
        }
    }

    return (
        <div style={{ width: '50vw' }}>
            <SpaceBetween size='l' direction='vertical'>
                <Container header={<Header />}
                    media={{
                        content: <img src="/email-verification-media.png" />,
                        position: "top",
                        width: "25vw",
                        height: "15vh",
                    }}>
                    {isError && <Alert type="warning">{errorMessage}</Alert>}
                    <Form header={<h2>Enter the verification code sent to your email</h2>}>
                        <SpaceBetween direction={SpaceBetweenDirection.vertical} size={SpaceBetweenSize.medium}>
                            <FormField label="Email Verification Code" stretch >
                                <Input
                                    placeholder="Email Verification Code"
                                    value={emailVerificationCode}
                                    onChange={({ detail }) => setEmailVerificationCode(detail.value)}
                                    inputMode="text"
                                />
                            </FormField>

                            <SpaceBetween size='m' direction="vertical">
                                <Button variant="primary" loading={loading} onClick={() => handleSubmit()}>Verify</Button>
                            </SpaceBetween>
                        </SpaceBetween>
                    </Form>
                </Container>
            </SpaceBetween>
        </div>
    )
}