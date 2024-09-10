import { Box, Button, Container, Form, FormField, Input, SpaceBetween } from "@cloudscape-design/components"
import { SpaceBetweenDirection, SpaceBetweenSize } from "../constants-styles";
import { useState } from "react";

export const EmailVerification = (): JSX.Element => {
    const [emailVerificationCode, setEmailVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);

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
        } catch (error) {
            console.error(error);
        }

        //redirect to dashboard
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