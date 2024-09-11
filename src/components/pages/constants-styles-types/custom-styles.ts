export const outerContainerStyle: React.CSSProperties | undefined = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',  
  margin: 0,           
  padding: 0,          
};

export const backgroundImageStyle: React.CSSProperties | undefined = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',  
  top: 0,
  left: 0,
};

export const overlayContainerStyle: React.CSSProperties | undefined = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '5vh 10vw',
  alignItems: 'center',
  flexDirection: 'column',
  background: 'rgba(0, 0, 0, 0.5)',  
};
