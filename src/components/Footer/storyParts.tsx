import {
  CubeIcon,
  DiscordLogoIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { m } from "../../docs/i18n";
import { FooterSocialLink, FooterSocials } from "./Footer";

const text = m.components.Footer.story;

/** Story-only: sample logo and social links shared by the Footer and FooterBar stories. */
export function StoryLogo() {
  return (
    <a
      href="#"
      className="flex items-center gap-2 text-xl font-bold text-(--_title-text)"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-(--scheme-600) text-white">
        <CubeIcon aria-hidden className="size-5" />
      </span>
      {text.brand}
    </a>
  );
}

const socials = [
  { name: "GitHub", icon: <GitHubLogoIcon aria-hidden /> },
  { name: "X", icon: <TwitterLogoIcon aria-hidden /> },
  { name: "LinkedIn", icon: <LinkedInLogoIcon aria-hidden /> },
  { name: "Instagram", icon: <InstagramLogoIcon aria-hidden /> },
  { name: "Discord", icon: <DiscordLogoIcon aria-hidden /> },
];

export function StorySocials() {
  return (
    <FooterSocials>
      {socials.map(({ name, icon }) => (
        <FooterSocialLink key={name} href="#" aria-label={name} icon={icon} />
      ))}
    </FooterSocials>
  );
}
