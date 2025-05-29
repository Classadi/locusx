// pages/_app.tsx
import "../src/app/globals.css"; // adjust path if needed
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
