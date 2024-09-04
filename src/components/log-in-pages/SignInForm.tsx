import { Box, Container, Form, FormField, Grid, Input, SpaceBetween } from "@cloudscape-design/components";
import { FormEvent, useState } from "react";
import { SpaceBetweenDirection, SpaceBetweenSize } from "../constants-styles/styling-constants";


export const SignInForm = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Header = ():JSX.Element => {
        return (
            <Box>
                <h1>Sign In</h1>
            </Box>
        );
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
    }

    return (
        <Container header={<Header />}>
            <Form>
                <SpaceBetween direction={SpaceBetweenDirection.vertical} size={SpaceBetweenSize.medium}>
                    <FormField label="Email Address">
                        <Input
                            placeholder="Enter your email"
                            value={email}
                            onChange={({ detail }) => setEmail(detail.value)}
                            inputMode="email"
                        />
                    </FormField>
                    <FormField label="Password">
                        <Input
                            placeholder="Enter your password"
                            value={password}
                            onChange={({ detail }) => setPassword(detail.value)}
                            type="password"
                        />
                    </FormField>
                </SpaceBetween>
            </Form>
        </Container>
    );
}