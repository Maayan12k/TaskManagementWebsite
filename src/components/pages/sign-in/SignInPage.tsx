import { Container } from "@cloudscape-design/components"
import { outerContainerStyle, overlayContainerStyle, UserLocation } from "../constants-styles-types"
import { NavigationBar } from "../shared-components/NavigationBar"
import { SignInForm } from "./SignInForm"
import { Background } from "../shared-components/Background"

export const SignInPage = (): JSX.Element => {

    return (
        <div style={{ overflow: 'hidden' }}>
            <NavigationBar userLocation={UserLocation.login} />
            <div style={outerContainerStyle}>
                <Background imgSrcPath="/sign-in-page-background.jpg" />
                <div style={overlayContainerStyle}>
                    <Container>
                        <SignInForm />
                    </Container>
                </div>
            </div>
        </div >
    )
}