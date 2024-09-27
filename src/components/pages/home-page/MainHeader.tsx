import { Box, Button, Container, SpaceBetween } from '@cloudscape-design/components'

export const MainHeader = (): JSX.Element => {
    return (
        <Container>
            <Box padding="s" textAlign="left" color="text-status-info">
                <Box fontSize="display-l" fontWeight="bold" variant="h1" padding="n">
                    Task management with ease.
                </Box>
                <Box fontSize="display-l" fontWeight="light">
                    Simple personal task organization and management.
                </Box>
                <Box variant="p" color="text-body-secondary" margin={{ top: 'xs', bottom: 'l' }}>
                    Create tasks, set due dates, upload relevant assets, and track your progress with
                    ease in one place so you can be a good steward of your time.
                </Box>
                <SpaceBetween direction="horizontal" size="xs">
                    <Button variant="primary" href='/sign-up'>Get Started </Button>
                    <Button variant='normal' href='/sign-in'>Sign In</Button>
                </SpaceBetween>
            </Box>
        </Container>
    )
}