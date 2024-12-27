import { Alert, Button, Container, Form, FormField, Input, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpStep, SpaceBetweenDirection, SpaceBetweenSize } from "../constants-styles-types";
import { useClerk } from "@clerk/clerk-react";
import { handleSignUp } from "./auth/SignUpModel";
import { Header } from "../shared-components/Header";

interface SignUpFormProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<SignUpStep>>;
  setDBUserName: React.Dispatch<React.SetStateAction<string>>;
  setDBUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const SignUpForm = ({ setCurrentStep, setDBUserName, setDBUserEmail }: SignUpFormProps): JSX.Element => {
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

  const clerk = useClerk();

  const handleSubmit = async (): Promise<void> => {
    setFirstNameError(validateFirstName(firstName));
    setLastNameError(validateLastName(lastName));
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    setConfirmPasswordError(validateConfirmPassword(password, confirmPassword));

    const isFormValid = !firstNameError && !lastNameError && !emailError && !passwordError && !confirmPasswordError;

    if (!isFormValid) return;

    setLoading(true);
    try {
      await handleSignUp(email, password, setCurrentStep, setIsError, setErrorMessage, clerk);
      setDBUserEmail(email);
      setDBUserName(`${firstName} ${lastName}`);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      setIsError(true);
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const validateFirstName = (value: string): string => {
    setFirstName(value);
    return value ? '' : 'First name is required';
  };

  const validateLastName = (value: string): string => {
    setLastName(value);
    return value ? '' : 'Last name is required';
  };

  const validateEmail = (value: string): string => {
    setEmail(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailPattern.test(value)) return 'Enter a valid email address';
    return '';
  };

  const validatePassword = (value: string): string => {
    setPassword(value);
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    setConfirmPassword(confirmPassword);
    if (!confirmPassword) return 'Confirm password is required';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  return (
    <div style={{ width: '50vw' }}>
      <SpaceBetween size={SpaceBetweenSize.large} direction={SpaceBetweenDirection.vertical}>
        <Container header={<Header title={'Sign Up'} />}>
          {isError && <Alert type="warning">{errorMessage}</Alert>}
          <Form>
            <SpaceBetween direction={SpaceBetweenDirection.vertical} size={SpaceBetweenSize.medium}>
              <FormField label="First Name" stretch errorText={firstNameError}>
                <Input
                  placeholder="First name"
                  value={firstName}
                  onChange={({ detail }) => setFirstNameError(validateFirstName(detail.value))}
                />
              </FormField>
              <FormField label="Last Name" stretch errorText={lastNameError}>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  onChange={({ detail }) => setLastNameError(validateLastName(detail.value))}
                />
              </FormField>
              <FormField label="Email Address" stretch errorText={emailError}>
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={({ detail }) => setEmailError(validateEmail(detail.value))}
                />
              </FormField>
              <FormField label="Password" stretch errorText={passwordError}>
                <Input
                  placeholder="Enter your password"
                  value={password}
                  onChange={({ detail }) => setPasswordError(validatePassword(detail.value))}
                  type="password"
                />
              </FormField>
              <FormField label="Confirm Password" stretch errorText={confirmPasswordError}>
                <Input
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={({ detail }) => setConfirmPasswordError(validateConfirmPassword(password, detail.value))}
                  type="password"
                />
              </FormField>
              <SpaceBetween size='m' direction={SpaceBetweenDirection.vertical}>
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
