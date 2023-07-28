import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PublicLayout } from "../../../components/layout/publicLayout";
import {
  Post,
  PostsApi,
} from "../../../services/gen/restClient";
import { apiConfig } from "../../../constants/apiConfig";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
  ArrowLeftIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { PaginationContainer } from "../../../components/@elements/pagination/PaginationContainer";

const api = new PostsApi(apiConfig);

const PostsPage: FC = () => {
  const router = useRouter();
  const [data, setData] = useState<Post[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const lastPostIndex = currentPage * pageLimit;
  const firstPostIndex = lastPostIndex - pageLimit;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex);
  const takeCount = pageLimit * currentPage;

  const fetchData = async () => {
    const resp = await api.apiPostsGet(takeCount);
    if (resp.status !== 200) return;
    setData(resp.data.data ?? []);
    setTotalCount(resp.data.total ?? 0);
  };

  const deleteItem = async (id: number) => {
    await api.apiPostsIdDelete(id);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [pageLimit, currentPage]);

  return (
    <PublicLayout title="admin">
      <div className="mr-auto">
        <Link href="/admin" legacyBehavior>
          <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-blue-500 absolute" />
        </Link>
      </div>
      <button
        className="btn btn-primary btn-sm mb-3 ml-auto px-1"
        onClick={() => router.push("/admin/posts/add")}
      >
        <PlusIcon className="h-6 w-6 cursor-pointer" />
      </button>
      {data?.length === 0 && <p>No data found</p>}
      {(data?.length ?? 0) > 0 && (
        <>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Categories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts!.map((k, i) => (
                  <tr key={i}>
                    <td>{k.title}</td>
                    <td>{k.slug}</td>
                    <td>{k.categories?.map((q) => q.title).join(",")}</td>
                    <td className="flex cent">
                      <TrashIcon
                        className="h-6 w-6 text-red-500 cursor-pointer"
                        onClick={() => deleteItem(k.postId!)}
                      />
                      <PencilSquareIcon
                        className="h-6 w-6 text-blue-500 cursor-pointer"
                        onClick={() =>
                          router.push("/admin/categories/" + k.postId)
                        }
                      />
                      <EyeIcon className="h-6 w-6 text-red-500 cursor-pointer"
                      onClick={() =>
                        router.push("/" + k.slug)
                      }/>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <PaginationContainer
        totalCount={totalCount}
        currentPage={currentPage}
        pageLimit={pageLimit}
        setCurrentPage={setCurrentPage}
        setPageLimit={setPageLimit}
      />
    </PublicLayout>
  );
};

export default PostsPage;
