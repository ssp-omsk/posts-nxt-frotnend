import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { NavBar } from "./navBar";
import { Constants } from "../../constants/constants";
import Link from "next/link";
interface AdminLayoutProps extends PropsWithChildren {
  title: string | null;
}

export const AdminLayout: FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>
          {Constants.siteName}
          {title && " - " + title}
        </title>
        <meta name="description" content={Constants.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <main className="flex items-center flex-col justify-between w-full">
          <div className="grid grid-cols-4 xl:grid-cols-5 gap-3 w-full">
            <div className="col-span-4 mr-3">{children}</div>
            <div className="block">
              <ul className="menu bg-base-200 w-56 rounded-box cursor-pointer">
                <li>
                  <Link href='/admin'>Admin</Link>
                </li>
                <li>
                  <Link href='/admin/categories'>Categories</Link>
                </li>
                <li>
                <Link href='/admin/posts'>Posts</Link>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </NavBar>
    </>
  );
};
