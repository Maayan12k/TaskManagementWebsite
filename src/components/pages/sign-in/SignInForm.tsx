import { Button, Container, Form, FormField, Input, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";
import { SpaceBetweenDirection, SpaceBetweenSize } from "../constants-styles-types/styling-constants";
import { Link } from "react-router-dom";
import { Header } from "../shared-components/Header";

export const SignInForm = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (value: string): void => {
        setEmail(value);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!value ? 'Email is required' : !emailPattern.test(value) ? 'Enter a valid email address' : '');
    };

    const validatePassword = (value: string): void => {
        setPassword(value);
        setPasswordError(
            !value
                ? 'Password is required'
                : value.length < 6
                    ? 'Password must be at least 6 characters'
                    : ''
        );
    };

    const handleSubmit = (): void => {
        const isFormValid = (): boolean => !!(!emailError && !passwordError && email && password);

        if (isFormValid()) {
            // Perform the API logic here, e.g., log in the user
            console.log('User signed up successfully');
            setLoading(true);
        } else {
            validateEmail(email);
            validatePassword(password);
        }
    }

    return (
        <div style={{ width: '40vw' }}>
            <SpaceBetween size={SpaceBetweenSize.large} direction={SpaceBetweenDirection.vertical}>
                <Container
                    header={<Header title={'Sign In'} />}
                    media={{
                        content: <img src="/log-in-media.jpg" />,
                        position: "top",
                        width: "25vw",
                        height: "15vh",
                    }}>
                    <Form>
                        <SpaceBetween
                            direction={SpaceBetweenDirection.vertical}
                            size={SpaceBetweenSize.medium}>
                            <FormField label="Email Address" stretch errorText={emailError}>
                                <Input
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={({ detail }) => validateEmail(detail.value)}
                                    inputMode="email"
                                />
                            </FormField>
                            <FormField label="Password" stretch errorText={passwordError}>
                                <Input
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={({ detail }) => validatePassword(detail.value)}
                                    type="password"
                                />
                            </FormField>
                            <SpaceBetween size='m' direction="vertical">
                                <Button variant="primary" loading={loading} onClick={() => handleSubmit()}>Sign In</Button>
                                <Link to='/sign-up'>Don't have an account? Sign up here!</Link>
                            </SpaceBetween>
                        </SpaceBetween>
                    </Form>
                </Container>
            </SpaceBetween>
        </div>
    );
}