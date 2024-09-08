import { TopNavigation } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { Identity, UserLocation, Utility } from "./constants-styles/styling-constants";

interface NavigationBarProps {
  userLocation?: UserLocation;
}

export const NavigationBar = ({userLocation}: NavigationBarProps): JSX.Element => {
  const [navItems, setNavItems] = useState<Utility[]>();

  const dashboardUtils = (): Utility[] => {
    return [
      {
        type: "button",
        text: "Sign Out",
        href: "/",
      },
    ]
  }

  const homeUtils = (): Utility[] => {
    return [
      {
        type: "button",
        text: "Get Started",
        href: "/sign-up",
      },
      {
        type: "button",
        variant: "primary-button",
        text: "Log In",
        href: "/log-in",
      },
    ];
  };

  const signupUtils = (): Utility[] => {
    return [
      {
        type: "button",
        text: "Home",
        href: "/",
      },
      {
        type: "button",
        variant: "primary-button",
        text: "Log In",
        href: "/log-in",
      },
    ];
  }

  const loginUtils = (): Utility[] => {
    return [
      {
        type: "button",
        text: "Home",
        href: "/",
      },
      {
        type: "button",
        variant: "primary-button",
        text: "Sign Up",
        href: "/sign-up",
      },
    ];
  }

  const navBarLogo: Identity = {
    href: "/",
    title: "Good Steward",
    logo: {
      src: "/GS_Logo_No_Text.svg",
      alt: "Logo"
    }
  }

  const renderNavBarUtils = (userLocation?: UserLocation): Utility[] => {
    switch (userLocation) {
      case UserLocation.dashboard:
        return dashboardUtils();
      case UserLocation.signup:
        return signupUtils();
      case UserLocation.login:
        return loginUtils();
      default:
        return homeUtils();
    }
  }

  useEffect(() => {
    setNavItems(renderNavBarUtils(userLocation));
  },[userLocation]);

  return (
    <TopNavigation
      identity={navBarLogo}
      utilities={navItems}
    />
  );
}