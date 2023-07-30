import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CategoriesApi, Category } from "../../../services/gen/restClient";
import { apiConfig } from "../../../constants/apiConfig";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon, ArrowLeftIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { AdminLayout } from "../../../components/layout/adminLayout";

const api = new CategoriesApi(apiConfig);

const CategoriesPage: FC = () => {
  const router = useRouter();
  const [data, setData] = useState<Category[]>();

  const fetchData = async () => {
    const resp = await api.apiCategoriesGet();
    if (resp.status !== 200) return;
    setData(resp.data);
  };

  const deleteItem = async (id: number) => {
    await api.apiCategoriesIdDelete(id);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ?.filter((q) => q.parentCategoryId == null)
                  .map((k, i) => (
                    <>
                      <tr key={i}>
                        <td>{k.title}</td>
                        <td>{k.slug} </td>
                        <td className="flex cent">
                          <TrashIcon
                            className="h-6 w-6 text-red-500 cursor-pointer"
                            onClick={() => deleteItem(k.categoryId!)}
                          />
                          <PencilSquareIcon
                            className="h-6 w-6 text-blue-500 cursor-pointer"
                            onClick={() =>
                              router.push("/admin/categories/" + k.categoryId)
                            }
                          />
                        </td>
                      </tr>
                      {data
                        ?.filter((q) => q.parentCategoryId == k.categoryId)
                        .map((k, i) => (
                          <tr key={"sub-" + i}>
                            <td> -- {k.title}</td>
                            <td>{k.slug}</td>
                            <td className="flex">
                              <TrashIcon
                                className="h-6 w-6 text-red-500 cursor-pointer"
                                onClick={() => deleteItem(k.categoryId!)}
                              />
                              <PencilSquareIcon
                                className="h-6 w-6 text-blue-500 cursor-pointer"
                                onClick={() =>
                                  router.push(
                                    "/admin/categories/" + k.categoryId
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </>
        
      )}
    </AdminLayout>
  );
};

export default CategoriesPage;
