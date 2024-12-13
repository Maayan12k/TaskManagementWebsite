import { TopNavigation } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { Identity, UserLocation, Utility } from "../constants-styles-types/styling-constants";

interface NavigationBarProps {
  userLocation?: UserLocation;
  setIsSignOutConfirmOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreateNewProjectOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreateNewTaskOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavigationBar = ({ userLocation, setIsSignOutConfirmOpen, setIsCreateNewProjectOpen, setIsCreateNewTaskOpen }: NavigationBarProps): JSX.Element => {
  const [navItems, setNavItems] = useState<Utility[]>([]);

  const navBarLogo: Identity = {
    href: "/",
    title: "Good Steward",
    logo: {
      src: "/GS_Logo_No_Text.svg",
      alt: "Logo",
    },
  };

  const handleSignOutButtonClick = () => {
    console.log('signing out')
    if (setIsSignOutConfirmOpen)
      setIsSignOutConfirmOpen(true);
  };
  const handleCreateNewProjectButtonClick = () => {
    console.log('creating new project')
    if (setIsCreateNewProjectOpen)
      setIsCreateNewProjectOpen(true);
  }

  const handleCreateNewTaskButtonClick = () => {
    console.log('creating new project')
    if (setIsCreateNewTaskOpen)
      setIsCreateNewTaskOpen(true);
  }

  const homeButton: Utility = { type: "button", text: "Home", href: "/" };
  const signInButton: Utility = { type: "button", variant: "primary-button", text: "Sign In", href: "/sign-in" };
  const signUpButton: Utility = { type: "button", variant: "primary-button", text: "Sign Up", href: "/sign-up" };
  const getStartedButton: Utility = { type: "button", text: "Get Started", href: "/sign-up" };
  const newProjectButton: Utility = { type: "button", text: "New Project", onClick: handleCreateNewProjectButtonClick };
  const newTaskButton: Utility = { type: "button", text: "New Task", onClick: handleCreateNewTaskButtonClick };
  const signOutButton: Utility = {
    type: "button",
    variant: 'primary-button',
    text: "Sign Out",
    onClick: handleSignOutButtonClick,
  };

  const renderNavBarUtils = (userLocation?: UserLocation): Utility[] => {
    const utils: Utility[] = [];

    switch (userLocation) {
      case UserLocation.dashboard:
        utils.push(newTaskButton);
        utils.push(newProjectButton);
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

  return (
    <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
      <TopNavigation identity={navBarLogo} utilities={navItems} />
    </div>
  )
};
