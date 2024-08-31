import { Box, Button, Container, ContentLayout, Grid, SpaceBetween } from '@cloudscape-design/components'
import { NavigationBar } from './components/NavigationBar'
import { SpaceBetweenSize } from './components/styling-constants'

function App() {


  return (
    <>
      <NavigationBar />

      <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        {/* Background Image */}
        <img
          src="/public/pexels-tima-miroshnichenko-5686112.jpg"
          alt="background"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Overlay Container */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            background: 'rgba(0, 0, 0, 0.5)', 
            paddingTop: '50px',
          }}
        >
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
                  <Button variant="primary">Get Started</Button>
                </SpaceBetween>
              </Box>
            </Container>
        </div>
      </div>
    </>
  )
}

export default App
