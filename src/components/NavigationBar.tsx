import { TopNavigation } from "@cloudscape-design/components";

export const NavigationBar = (): JSX.Element => {

    return (
        <TopNavigation
      identity={{
        href: "https://example.com/",
        title: "Good Steward",
        logo: {
          src: "/GS_Logo.svg",
          alt: "Logo"
        }
      }}
      utilities={[
        {
          type: "button",
          text: "Get Started",
          href: "https://example.com/",
        },
        {
          type: "button",
          variant: "primary-button",
          text: "Sign In",
          href: "https://example.com/",
        },
      ]}
    />
        
    );
}