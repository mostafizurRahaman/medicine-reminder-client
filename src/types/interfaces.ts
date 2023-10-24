import {} from "react";
import { ClickEventType } from "./types";

interface buttonProps {
   containerStyles?: string;
   text: string;
   action?: ClickEventType;
   children?: React.ReactNode;
}

export type { buttonProps };
