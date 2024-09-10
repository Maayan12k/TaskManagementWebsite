import { Alert, Box, Button, Container, Form, FormField, Input, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpStep, SpaceBetweenDirection, SpaceBetweenSize } from "../constants-styles";

declare global {
  interface Window {
    Clerk: any;
  }
}

interface SignUpFormProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<SignUpStep>>;
}

interface ClerkAPIError {
  code: string;
  message: string;
  longMessage: string;
  meta?: {
    paramName?: string
    sessionId?: string
    emailAddresses?: string[]
    identifiers?: string[]
    zxcvbn?: {
      suggestions: {
        code: string
        message: string
      }[]
    }
    permissions?: string[]
  }
}

interface ClerkAPIErrorResponse {
  status: number;
  clerkError: boolean;
  errors: ClerkAPIError[];
}

export const SignUpForm = ({ setCurrentStep }: SignUpFormProps): JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const Header = (): JSX.Element => (
    <Box>
      <h1>Sign Up</h1>
    </Box>
  );

  const validateFirstName = (value: string): void => {
    setFirstName(value);
    setFirstNameError(value ? '' : 'First name is required');
  };

  const validateLastName = (value: string): void => {
    setLastName(value);
    setLastNameError(value ? '' : 'Last name is required');
  };

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
    validateConfirmPassword(confirmPassword);
  };

  const validateConfirmPassword = (value: string): void => {
    setConfirmPassword(value);
    setConfirmPasswordError(
      !value
        ? 'Confirm password is required'
        : value !== password
          ? 'Passwords do not match'
          : ''
    );
  };

  const handleSubmit = async (): Promise<void> => {

    const isFormValid = (): boolean => !!(!firstNameError && !lastNameError && !emailError && !passwordError && !confirmPasswordError && firstName && lastName && email && password && confirmPassword);

    const isClerkAPIResponseError = (error: ClerkAPIErrorResponse): boolean => {
      return error.clerkError;
    }

    if (isFormValid()) {
      setLoading(true);

      try {
        if (!window.Clerk) {
          throw new Error('Clerk is not initialized.');
        }

        await window.Clerk.load();

        if (!window.Clerk.client || !window.Clerk.client.signUp) {
          throw new Error('Clerk client is not available.');
        }

        const signUpConfig = {
          emailAddress: email,
          password: password,
        }
        await window.Clerk.client.signUp.create(signUpConfig);
        await window.Clerk.client.signUp.prepareEmailAddressVerification();

        setCurrentStep(SignUpStep.Verification);
        console.log('User signed up successfully');
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
        const errorReceived = error as ClerkAPIErrorResponse;
        if (isClerkAPIResponseError(errorReceived)) {
          setIsError(true);
          setErrorMessage(errorReceived.errors[0].longMessage);
          setLoading(false);
        }

      }
    } else {
      validateFirstName(firstName);
      validateLastName(lastName);
      validateEmail(email);
      validatePassword(password);
    }
  };

  return (
    <div style={{ width: '50vw' }}>
      <SpaceBetween size='l' direction='vertical'>
        <Container header={<Header />}
          media={{
            content: <img src="/sign-up-page-media.jpg" />,
            position: "top",
            width: "25vw",
            height: "15vh",
          }}>
          {isError && <Alert type="warning">{errorMessage}</Alert>}
          <Form >
            <SpaceBetween direction={SpaceBetweenDirection.vertical} size={SpaceBetweenSize.medium}>
              <FormField label="First Name" stretch errorText={firstNameError}>
                <Input
                  placeholder="First name"
                  value={firstName}
                  onChange={({ detail }) => validateFirstName(detail.value)}
                  inputMode="text"
                />
              </FormField>
              <FormField label="Last Name" stretch errorText={lastNameError}>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  onChange={({ detail }) => validateLastName(detail.value)}
                  inputMode="text"
                />
              </FormField>
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
              <FormField label="Confirm Password" stretch errorText={confirmPasswordError}>
                <Input
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={({ detail }) => validateConfirmPassword(detail.value)}
                  type="password"
                />
              </FormField>
              <SpaceBetween size='m' direction="vertical">
                <Button variant="primary" loading={loading} onClick={() => handleSubmit()}>Create Account</Button>
                <Link to='/log-in'>Already have an account?</Link>
              </SpaceBetween>
            </SpaceBetween>
          </Form>
        </Container>
      </SpaceBetween>
    </div>
  );
};
