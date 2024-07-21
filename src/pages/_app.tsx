import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import "@/styles/globals.css";

const App = dynamic(() => import("../components/app"), { ssr: false });

export default (props: AppProps) => <App {...props} />;
