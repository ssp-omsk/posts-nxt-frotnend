import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Post, PostsApi } from "../../../services/gen/restClient";
import { apiConfig } from "../../../constants/apiConfig";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
  ArrowLeftIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { PaginationContainer } from "../../../components/@elements/pagination/PaginationContainer";
import { AdminLayout } from "../../../components/layout/adminLayout";

const api = new PostsApi(apiConfig);

const PostsPage: FC = () => {
  const limits = [5, 10, 20, 50];

  const router = useRouter();
  const [data, setData] = useState<Post[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    const resp = await api.apiPostsGet(
      pageLimit,
      (currentPage - 1) * pageLimit
    );
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
    <AdminLayout title="admin">
      <div className="w-full flex">
        <div className="mr-auto">
          <Link href="/admin" legacyBehavior>
            <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-primary absolute" />
          </Link>
        </div>
        <button
          className="btn btn-primary btn-sm mb-3 ml-auto px-1"
          onClick={() => router.push("/admin/posts/add")}
        >
          <PlusIcon className="h-6 w-6 cursor-pointer" />
        </button>
      </div>
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
                {data!.map((k, i) => (
                  <tr key={i}>
                    <td> <p className="w-48 truncate">{k.title}</p> </td>
                    <td> <p className="w-48 truncate">{k.slug}</p> </td>
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
                      <EyeIcon
                        className="h-6 w-6 text-green-500 cursor-pointer"
                        onClick={() => router.push("/p/" + k.slug)}
                      />
                      <PencilIcon
                      className="h-6 w-6 text-grey-500 cursor-pointer" 
                      onClick={() => router.push("/editingPost/" +  k.slug)}
                      />
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
        limits={limits}
        setCurrentPage={setCurrentPage}
        setPageLimit={setPageLimit}
      />
    </AdminLayout>
  );
};

export default PostsPage;
