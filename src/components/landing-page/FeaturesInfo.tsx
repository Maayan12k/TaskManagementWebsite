import { ColumnLayout, Container, Header, SpaceBetween } from '@cloudscape-design/components'
import { SpaceBetweenSize } from '../constants-styles/styling-constants'

export const FeaturesInfo = (): JSX.Element => {
    return (
        <Container>
                <SpaceBetween size={SpaceBetweenSize.small}>
                    <Header>
                    Features
                    </Header>
                    <ColumnLayout columns={3} variant="text-grid" >
                    <div style={{display: "flex", justifyContent: 'center'}}>
                        Organize and archive tasks.
                    </div>
                    <div style={{display: "flex", justifyContent: 'center'}}>
                        Add and delete files, images, videos from tasks. 
                    </div>
                    <div style={{display: "flex", justifyContent: 'center'}}>
                        Export tasks to output formats.
                    </div>
                    </ColumnLayout>
                </SpaceBetween>
            </Container>
    )
}