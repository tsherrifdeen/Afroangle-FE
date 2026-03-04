import { JSX } from "react";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaGlobe,
  FaLinkedin,
} from "react-icons/fa6";

// 1. Define the valid platform keys as a type
export type PlatformType =
  | "x"
  | "instagram"
  | "linkedin"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "website";

// 2. Interface for the map structure
interface PlatformConfig {
  label: string;
  Icon: JSX.Element;
}

// 3. The Map with explicit typing
const PLATFORM_MAP: Record<PlatformType, PlatformConfig> = {
  x: { label: "X", Icon: <FaXTwitter /> },
  instagram: { label: "Instagram", Icon: <FaInstagram /> },
  linkedin: { label: "LinkedIn", Icon: <FaLinkedin /> },
  facebook: { label: "Facebook", Icon: <FaFacebookF /> },
  youtube: { label: "YouTube", Icon: <FaYoutube /> },
  tiktok: { label: "TikTok", Icon: <FaTiktok /> },
  website: { label: "Website", Icon: <FaGlobe /> },
};

interface SocialLinkProps {
  platform: PlatformType; // Use the specific type instead of generic string
  url: string;
}

const SocialLink = ({ platform, url }: SocialLinkProps) => {
  // TypeScript now knows platform exists in PLATFORM_MAP
  const platformData = PLATFORM_MAP[platform];

  // Optional: Fallback logic in case 'platform' comes from an external API and might be wrong
  if (!platformData) {
    return null;
  }

  const { label, Icon } = platformData;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit their ${label} page`}
      className="p-2 bg-primary-green rounded-full text-white text-2xl hover:opacity-80 transition-opacity inline-block"
    >
      {Icon}
    </a>
  );
};

export default SocialLink;
