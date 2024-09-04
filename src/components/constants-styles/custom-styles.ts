export const outerContainerStyle: React.CSSProperties | undefined = {
    position: 'relative',
    height: '100vh',
    width: '100vw',
  };
  
  export const backgroundImageStyle: React.CSSProperties | undefined = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };
  
  export const overlayContainerStyle: React.CSSProperties | undefined = {
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
  };
  