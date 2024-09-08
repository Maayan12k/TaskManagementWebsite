import { Container, SpaceBetween } from "@cloudscape-design/components"
import { backgroundImageStyle, outerContainerStyle, overlayContainerStyle, SpaceBetweenDirection, SpaceBetweenSize, UserLocation } from "../constants-styles"
import { NavigationBar } from "../NavigationBar"
import { LogInForm } from "./LogInForm"

export const LoginPage = (): JSX.Element => {

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
        <div style={{overflow: 'hidden'}}>
            <NavigationBar userLocation={UserLocation.login}/>
            <div style={outerContainerStyle}>
                {homeBackground()}
                <div style={overlayContainerStyle}>
                    <Container>
                        <LogInForm />
                    </Container>
                </div>
            </div>
        </div >
    )
}