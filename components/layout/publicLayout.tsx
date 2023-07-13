import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { NavBar } from "./navBar";
import { Constants } from "../../constants/constants";
interface PublicLayoutProps extends PropsWithChildren {
    title: string | null
}

export const PublicLayout: FC<PublicLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{Constants.siteName}{title && ' - ' + title}</title>
        <meta name="description" content={Constants.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <main className="flex items-center flex-col justify-between w-full">
          {children}
        </main>
      </NavBar>
    </>
  );
};
