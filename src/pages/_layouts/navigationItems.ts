import { ElementType } from "react";
export interface NavItem {
  type: string;
  text: string;
  description?: string;
  children?: Array<NavItem>;
  href?: string;
  target?: string;
  icon?: ElementType;
  tab?: string;
}

const NAVITEMS: Array<NavItem> =  [

  {
    type: "link",
    text: "Dashboard",
    href: "/",
    // icon: "",
  },

];

export default NAVITEMS;
