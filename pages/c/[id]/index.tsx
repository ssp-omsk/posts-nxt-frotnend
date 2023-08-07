import { useRouter } from "next/router";
import { apiConfig } from "../../../constants/apiConfig";
import { Post, PostsApi } from "../../../services/gen/restClient";
import { useEffect, useState } from "react";
import { PublicLayout } from "../../../components/layout/publicLayout";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { SideBar } from "../../../components/@elements/SideBar";
import { PaginationContainer } from "../../../components/@elements/pagination/PaginationContainer";

const api = new PostsApi(apiConfig);

const PostsCategory = () => {
  const router = useRouter();

  const [data, setData] = useState<Post[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    const resp = await api.apiPostsGet(
      pageLimit,
      (currentPage - 1) * pageLimit,
      router.query.id as string
    );
    if (resp.status !== 200) return;
    setData(resp.data.data ?? []);
    setTotalCount(resp.data.total ?? 0);
  };

  useEffect(() => {
    fetchData(); 
  }, [pageLimit, currentPage, router]);

  return (
      <PublicLayout title={null}>
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-3 w-full">
          {data?.map(item => {
            return (
              <div className="col-span-4 mr-3" key={item.postId} >
                <div className="card shadow-xl bg-base-300 p-5">
                  <div >
                    <Link href="/#" legacyBehavior>
                      <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-primary"/>
                    </Link>
                  </div>
                  <h1 className="mb-2">{item.title}</h1>
                  <p className="mb-2">{item.desctiption}</p>
                  <img className="mb-2" src={item.image ?? ''} alt="image of post" />
                  <div>
                    {item.body}
                  </div>
                </div>
              </div>
            )
          })
          }
          <div className="hidden xl:block">
            <SideBar 
            currentCategory={router.query.id as string}
            setCurrentPage={setCurrentPage} />
          </div>
          <PaginationContainer
            totalCount={totalCount}
            currentPage={currentPage}
            pageLimit={pageLimit}
            limits={[]}
            setCurrentPage={setCurrentPage}
            setPageLimit={setPageLimit}
          />
        </div>
      </PublicLayout>)
}

export default PostsCategory;