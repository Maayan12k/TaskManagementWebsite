import { TopNavigation } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { Identity, Utility } from "./constants-styles/styling-constants";

export const NavigationBar = (): JSX.Element => {
  const [navItems, setNavItems] = useState<Utility[]>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const loggedInUtils = (): Utility[] => {
    return [
      {
        type: "button",
        text: "Sign Out",
        href: "https://example.com/",
      },
    ]
  }

  const notLoggedInUtils = (): Utility[] => {
    return [
      {
        type: "button",
        text: "Get Started",
        href: "https://example.com/",
      },
      {
        type: "button",
        variant: "primary-button",
        text: "Log In",
        href: "https://example.com/",
      },
    ];
  };

  const navBarLogo: Identity = {
    href: "https://example.com/",
    title: "Good Steward",
    logo: {
      src: "/GS_Logo.svg",
      alt: "Logo"
    }
  }

  useEffect(() => {

    const renderNavBarUtils = isUserLoggedIn ? loggedInUtils: notLoggedInUtils;
    setNavItems(renderNavBarUtils);

  },[isUserLoggedIn, notLoggedInUtils, loggedInUtils])

  return (
    <TopNavigation
      identity={navBarLogo}
      utilities={navItems}
    />
  );
}