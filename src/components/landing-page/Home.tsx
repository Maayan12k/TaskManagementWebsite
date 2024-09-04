import {SpaceBetween } from '@cloudscape-design/components'
import { SpaceBetweenDirection, SpaceBetweenSize } from '../constants-styles/styling-constants'
import { backgroundImageStyle, outerContainerStyle, overlayContainerStyle } from '../constants-styles/custom-styles'
import { FeaturesInfo, MainHeader, WhyInfo } from '.'
import { SignInForm } from '../log-in-pages/SignInForm'

export const Home = (): JSX.Element => {

    const homeBackground = (): JSX.Element => {
        const imgSrcPath = "/public/home-background.jpg"
        return (
            <img
                src={imgSrcPath}
                style={backgroundImageStyle}
            />
        )
    }

    return (

        <div style={outerContainerStyle}>
            {homeBackground()}
            <div style={overlayContainerStyle}>
                <SpaceBetween size={SpaceBetweenSize.large} direction={SpaceBetweenDirection.vertical}>
                    <MainHeader/>
                    <FeaturesInfo/>
                    <WhyInfo/>
                </SpaceBetween>
            </div>
      </div>
    )
}