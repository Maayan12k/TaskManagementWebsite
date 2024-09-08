import { Container } from "@cloudscape-design/components"
import { backgroundImageStyle, outerContainerStyle, overlayContainerStyle, SpaceBetweenDirection, SpaceBetweenSize, UserLocation } from "../constants-styles"
import { NavigationBar } from "../NavigationBar"
import { SignUpForm } from "./SignUpForm"

export const SignUpPage = (): JSX.Element => {

    const homeBackground = (): JSX.Element => {
        const imgSrcPath = "/public/sign-in-page-background.jpg"
        return (
            <img
                src={imgSrcPath}
                style={backgroundImageStyle}
            />
        )
    }

    return (
        <>
            <NavigationBar userLocation={UserLocation.signup}/>
            <div style={outerContainerStyle}>
                {homeBackground()}
                <div style={overlayContainerStyle}>
                    <Container>
                        <SignUpForm />
                    </Container>
                </div>
            </div>
        </>
    )
}