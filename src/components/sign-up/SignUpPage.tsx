import { Container } from "@cloudscape-design/components"
import { backgroundImageStyle, outerContainerStyle, overlayContainerStyle, SignUpStep, SpaceBetweenDirection, SpaceBetweenSize, UserLocation } from "../constants-styles"
import { NavigationBar } from "../NavigationBar"
import { SignUpForm } from "./SignUpForm"
import { EmailVerification } from "./EmailVerification"
import { useState } from "react"

export const SignUpPage = (): JSX.Element => {
    const [currentStep, setCurrentStep] = useState<SignUpStep>(SignUpStep.SignUp);

    const steps = (step: SignUpStep) => {
        switch (step) {
            case SignUpStep.SignUp:
                return <SignUpForm setCurrentStep={setCurrentStep} />
            case SignUpStep.Verification:
                return <EmailVerification />
        }
    }

    const homeBackground = (): JSX.Element => {
        const imgSrcPath = "/sign-in-page-background.jpg"
        return (
            <img
                src={imgSrcPath}
                style={backgroundImageStyle}
            />
        )
    }

    return (
        <>
            <NavigationBar userLocation={UserLocation.signup} />
            <div style={outerContainerStyle}>
                {homeBackground()}
                <div style={overlayContainerStyle}>
                    <Container>
                        {steps(currentStep)}
                    </Container>
                </div>
            </div>
        </>
    )
}