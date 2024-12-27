import { Container } from "@cloudscape-design/components"
import { outerContainerStyle, overlayContainerStyle, SignUpStep, UserLocation } from "../constants-styles-types"
import { NavigationBar } from "../shared-components/NavigationBar"
import { SignUpForm } from "./SignUpForm"
import { EmailVerification } from "./EmailVerification"
import { useState } from "react"
import { Background } from "../shared-components/Background"

export const SignUpPage = (): JSX.Element => {
    const [currentStep, setCurrentStep] = useState<SignUpStep>(SignUpStep.SignUp);
    const [dbUserEmail, setDBUserEmail] = useState<string>('');
    const [dbUserName, setDBUserName] = useState<string>('');

    const steps = (step: SignUpStep) => {
        switch (step) {
            case SignUpStep.SignUp:
                return <SignUpForm setCurrentStep={setCurrentStep} setDBUserEmail={setDBUserEmail} setDBUserName={setDBUserName} />
            case SignUpStep.Verification:
                return <EmailVerification dbName={dbUserName} dbEmail={dbUserEmail} />
        }
    }

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