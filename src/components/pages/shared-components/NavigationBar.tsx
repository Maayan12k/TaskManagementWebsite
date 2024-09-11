import { TopNavigation } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { Identity, UserLocation, Utility } from "../constants-styles-types/styling-constants";

interface NavigationBarProps {
  userLocation?: UserLocation;
}

export const NavigationBar = ({ userLocation }: NavigationBarProps): JSX.Element => {
  const [navItems, setNavItems] = useState<Utility[]>([]);

  const navBarLogo: Identity = {
    href: "/",
    title: "Good Steward",
    logo: {
      src: "/GS_Logo_No_Text.svg",
      alt: "Logo",
    },
  };

  const homeButton: Utility = { type: "button", text: "Home", href: "/" };
  const signInButton: Utility = { type: "button", variant: "primary-button", text: "Sign In", href: "/sign-in" };
  const signUpButton: Utility = { type: "button", variant: "primary-button", text: "Sign Up", href: "/sign-up" };
  const getStartedButton: Utility = { type: "button", text: "Get Started", href: "/sign-up" };
  const signOutButton: Utility = { type: "button", text: "Sign Out", href: "/" };

  const renderNavBarUtils = (userLocation?: UserLocation): Utility[] => {
    const utils: Utility[] = [];

    switch (userLocation) {
      case UserLocation.dashboard:
        utils.push(signOutButton);
        break;
      case UserLocation.signup:
        utils.push(homeButton, signInButton);
        break;
      case UserLocation.login:
        utils.push(homeButton, signUpButton);
        break;
      default:
        utils.push(getStartedButton, signInButton);
        break;
    }

    return utils;
  };

  useEffect(() => {
    setNavItems(renderNavBarUtils(userLocation));
  }, [userLocation]);

  return <TopNavigation identity={navBarLogo} utilities={navItems} />;
};
