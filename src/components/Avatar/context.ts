import { createContext } from "react";
import type { AvatarSize } from "./Avatar";

/** Set by AvatarGroup: its avatars default to the group's size. */
export const AvatarGroupContext = createContext<{ size?: AvatarSize }>({});
