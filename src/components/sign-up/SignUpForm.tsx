import { Alert, Box, Button, Container, Form, FormField, Input, SpaceBetween } from "@cloudscape-design/components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpStep, SpaceBetweenDirection, SpaceBetweenSize } from "../constants-styles";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  handleSignUp,
  isClerkAPIResponseError,
} from './auth/SignUpModel';

interface SignUpFormProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<SignUpStep>>;
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
      await handleSignUp(email, password);
      setCurrentStep(SignUpStep.Verification);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        setIsError(true);
        setErrorMessage(error.errors[0].longMessage);
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '50vw' }}>
      <SpaceBetween size='l' direction='vertical'>
        <Container header={<Header />}>
          {isError && <Alert type="warning">{errorMessage}</Alert>}
          <Form>
            <SpaceBetween direction={SpaceBetweenDirection.vertical} size={SpaceBetweenSize.medium}>
              <FormField label="First Name" stretch errorText={firstNameError}>
                <Input
                  placeholder="First name"
                  value={firstName}
                  onChange={({ detail }) => setFirstName(detail.value)}
                  onBlur={() => setFirstNameError(validateFirstName(firstName))}
                />
              </FormField>
              <FormField label="Last Name" stretch errorText={lastNameError}>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  onChange={({ detail }) => setLastName(detail.value)}
                  onBlur={() => setLastNameError(validateLastName(lastName))}
                />
              </FormField>
              <FormField label="Email Address" stretch errorText={emailError}>
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={({ detail }) => setEmail(detail.value)}
                  onBlur={() => setEmailError(validateEmail(email))}
                />
              </FormField>
              <FormField label="Password" stretch errorText={passwordError}>
                <Input
                  placeholder="Enter your password"
                  value={password}
                  onChange={({ detail }) => setPassword(detail.value)}
                  onBlur={() => setPasswordError(validatePassword(password))}
                  type="password"
                />
              </FormField>
              <FormField label="Confirm Password" stretch errorText={confirmPasswordError}>
                <Input
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={({ detail }) => setConfirmPassword(detail.value)}
                  onBlur={() => setConfirmPasswordError(validateConfirmPassword(password, confirmPassword))}
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
