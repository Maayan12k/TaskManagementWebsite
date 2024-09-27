import { backgroundImageStyle } from '../constants-styles-types/custom-styles';

interface BackgroundProps {
    imgSrcPath: string;
}

export const Background = ({ imgSrcPath }: BackgroundProps): JSX.Element => {
    return <img src={imgSrcPath} style={backgroundImageStyle} />;
};
