import { ButtonDropdownProps, ButtonProps, IconProps } from "@cloudscape-design/components";
import { CancelableEventHandler } from "@cloudscape-design/components/internal/events";

export enum SpaceBetweenDirection {
    vertical = 'vertical',
    horizontal = 'horizontal',
}

export enum SpaceBetweenSize {
    xxxsmall = 'xxxs',
    xxsmall = 'xxs',
    xsmall = 'xs',
    small = 's',
    medium = 'm',
    large = 'l',
    xlarge = 'xl',
    xxlarge = 'xxl',
}

interface BaseUtility {
    text?: string;
    title?: string;
    iconName?: IconProps.Name;
    iconUrl?: string;
    iconAlt?: string;
    iconSvg?: React.ReactNode;
    ariaLabel?: string;
    badge?: boolean;
    disableUtilityCollapse?: boolean;
    disableTextCollapse?: boolean;
}
export interface MenuDropdownUtility extends BaseUtility {
    type: 'menu-dropdown';
    description?: string;
    items: ButtonDropdownProps.Items;
    expandableGroups?: boolean;
    onItemClick?: CancelableEventHandler<ButtonDropdownProps.ItemClickDetails>;
    onItemFollow?: CancelableEventHandler<ButtonDropdownProps.ItemClickDetails>;
}
export interface ButtonUtility extends BaseUtility {
    type: 'button';
    variant?: 'primary-button' | 'link';
    onClick?: CancelableEventHandler;
    onFollow?: CancelableEventHandler<ButtonProps.FollowDetail>;
    href?: string;
    target?: string;
    rel?: string;
    external?: boolean;
    externalIconAriaLabel?: string;
}
export type Utility = MenuDropdownUtility | ButtonUtility;

export interface Identity {
    title?: string;
    logo?: Logo;
    href: string;
    onFollow?: CancelableEventHandler;
}
interface Logo {
    src: string;
    alt?: string;
}

export enum UserLocation {
    signup,
    login,
    dashboard,
  }