import { Container, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import { SpaceBetweenSize } from "../constants-styles-types/styling-constants"

export const WhyInfo = (): JSX.Element => {
    return (
        <Container>
            <SpaceBetween size={SpaceBetweenSize.small}>
                <Header>
                    Why Good Steward?
                </Header>
                <TextContent>
                    <p>In Christian theology, a "good steward" is someone who manages their resources responsibly and faithfully, as if they were entrusted by God.</p>
                    <ul>
                        <li>Time management can improve decision-making: 83% of people believe that better time management skills can improve their decision-making abilities. </li>
                        <li>Planning can save time: Planning your day for 10-12 minutes can save up to two hours of wasted time.</li>
                        <li>Multitasking can decrease productivity: Multitasking can cause productivity to drop by as much as 40%.</li>
                    </ul>
                </TextContent>
            </SpaceBetween>
        </Container>
    )
}