import { Container } from "@cloudscape-design/components"
import { outerContainerStyle, overlayContainerStyle, SignUpStep, UserLocation } from "../constants-styles-types"
import { NavigationBar } from "../shared-components/NavigationBar"
import { SignUpForm } from "./SignUpForm"
import { EmailVerification } from "./EmailVerification"
import { useEffect, useState } from "react"
import { Background } from "../shared-components/Background"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { databaseEndpoint } from "../../../main"

export const SignUpPage = (): JSX.Element => {
    const [currentStep, setCurrentStep] = useState<SignUpStep>(SignUpStep.SignUp);
    const [dbUserEmail, setDBUserEmail] = useState<string>('');
    const [dbUserName, setDBUserName] = useState<string>('');

    const navigate = useNavigate();

    const steps = (step: SignUpStep) => {
        switch (step) {
            case SignUpStep.SignUp:
                return <SignUpForm setCurrentStep={setCurrentStep} setDBUserEmail={setDBUserEmail} setDBUserName={setDBUserName} />
            case SignUpStep.Verification:
                return <EmailVerification />
        }
    }

    const { userId, isLoaded } = useAuth();

    useEffect(() => {
        const createUser = async () => {
            if (userId && isLoaded) {
                console.log('User ID:', userId);
                const response = await axios.post(`https://${databaseEndpoint}/users`, { id: userId, email: dbUserEmail, name: dbUserName });
                console.log("Created User:", response.data);
                navigate(`/dashboard/${userId}`);
            }
        };
        createUser();
    }, [userId, isLoaded]);

    return (
        <>
            <NavigationBar userLocation={UserLocation.signup} />
            <div style={outerContainerStyle}>
                <Background imgSrcPath="/sign-in-page-background.jpg" />
                <div style={overlayContainerStyle}>
                    <Container>
                        {steps(currentStep)}
                    </Container>
                </div>
            </div>
        </>
    )
}