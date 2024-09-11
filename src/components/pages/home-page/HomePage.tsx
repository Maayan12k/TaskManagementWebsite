import { SpaceBetween } from '@cloudscape-design/components'
import { SpaceBetweenDirection, SpaceBetweenSize } from '../constants-styles-types/styling-constants'
import { outerContainerStyle, overlayContainerStyle } from '../constants-styles-types/custom-styles'
import { NavigationBar } from '../shared-components/NavigationBar'
import { Background } from '../shared-components/Background'
import { MainHeader } from './MainHeader'
import { FeaturesInfo } from './FeaturesInfo'
import { WhyInfo } from './WhyInfo'

export const HomePage = (): JSX.Element => {
    return (
        <>
            <NavigationBar />
            <div style={outerContainerStyle}>
                <Background imgSrcPath="/home-background.jpg" />
                <div style={overlayContainerStyle}>
                    <SpaceBetween size={SpaceBetweenSize.large} direction={SpaceBetweenDirection.vertical}>
                        <MainHeader />
                        <FeaturesInfo />
                        <WhyInfo />
                    </SpaceBetween>
                </div>
            </div>
        </>
    )
}