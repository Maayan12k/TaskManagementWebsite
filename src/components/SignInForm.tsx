import { Box, Container, Form, FormField, Grid, Input, SpaceBetween } from "@cloudscape-design/components";
import { FormEvent, useState } from "react";
import { SpaceBetweenDirection, SpaceBetweenSize } from "./styling-constants";


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
        console.log('Email:', email);
        console.log('Password:', password);
    }

    return (
        <Grid
            gridDefinition={[
                {colspan: { default: 12, xs: 12, s: 12, l: 12, xl: 12 }},
                {colspan: { default: 12, xs: 12, s: 12, l: 12, xl: 12 }},
                {colspan: { default: 12, xs: 12, s: 12, l: 12, xl: 12 }},
                {colspan: { default: 12, xs: 12, s: 12, l: 12, xl: 12 }},
                { colspan: { default: 3, xs: 12, s: 8, l: 6, xl: 4 }, offset: { l: 3, xl: 4 } }, 
            ]}
        >
            <> </>
            <> </>
            <> </>
            <> </>
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
        </Grid>
    );
}