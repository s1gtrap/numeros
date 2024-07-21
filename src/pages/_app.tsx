import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import "@/styles/globals.css";

const App = dynamic(() => import("../components/app"), { ssr: false });

function Wrapper(props: AppProps) {
  return <App {...props} />;
}

export default Wrapper;
