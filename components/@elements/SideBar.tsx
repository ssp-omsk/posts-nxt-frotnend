import { useEffect, useState } from "react";
import { apiConfig } from "../../constants/apiConfig";
import { Card } from "./card"
import { CategoriesApi, Category } from "../../services/gen/restClient";
import { useRouter } from "next/router";
import Link from "next/link";

const api = new CategoriesApi(apiConfig);

type Props = {
  currentCategory?: string
  setCurrentPage?: (page: number) => void
}

export const SideBar = ({ currentCategory, setCurrentPage }: Props) => {
  const router = useRouter();
  const [data, setData] = useState<Category[]>();

  const fetchData = async () => {
    const resp = await api.apiCategoriesGet();
    if (resp.status !== 200) return;
    setData(resp.data ?? []);
  };

  useEffect(() => {
    fetchData();
  }, [router]);
  return (
    <div className="hidden xl:block">
      <Card title="Categories" >
        <ul>
          {data?.map(item => {
            return (
              <div key={item.categoryId}>
                <li>
                  <Link className={currentCategory === item.slug ? 'text-blue-500' : ''}
                    onClick={() => {
                      if (setCurrentPage) {
                        setCurrentPage(1)
                      }
                    }} href={"/c/" + item.slug}>
                    {item.slug}
                  </Link>
                </li>
              </div>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}