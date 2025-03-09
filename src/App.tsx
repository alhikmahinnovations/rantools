import { Link, SettingsInputAntenna } from "@mui/icons-material";
import type { Navigation } from "@toolpad/core";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router";

const NAVIGATION: Navigation = [
  // {
  //   title: "Tableau de bord",
  //   icon: <Dashboard />,
  // },
  {
    kind: "header",
    title: "Outils",
  },
  {
    segment: "sites", // links the navigationtem to the route
    title: "Sites",
    icon: <SettingsInputAntenna />,
    children: [
      {
        segment: "chainsites",
        title: "Chainer des sites",
        icon: <Link />,
      },
    ],
  },
];

const BRANDING = {
  title: "RANTOOLS",
  // logo: "",
  logo: (
    <img src="/assets/icons/yas.svg" alt="NetXVision" width={40} height={40} />
  ),
};

export default function App() {
  return (
    <div>
      <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
        <Outlet />
      </ReactRouterAppProvider>
    </div>
  );
}
