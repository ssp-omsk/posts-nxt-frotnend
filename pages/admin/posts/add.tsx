import { FC, useEffect, useState } from "react";
import { PublicLayout } from "../../../components/layout/publicLayout";
import { Card } from "../../../components/@elements/card";
import { Select } from "../../../components/@elements/select";
import { Wysiwyg } from "../../../components/wysiwyg";
import {
  CategoriesApi,
  Category,
  Post,
  PostsApi,
} from "../../../services/gen/restClient";
import { apiConfig } from "../../../constants/apiConfig";
import { useRouter } from "next/router";
import { MultiSelect } from "react-multi-select-component";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import axios from "axios";

var slugify = require("slugify");

const categoriesApi = new CategoriesApi(apiConfig);
const postsApi = new PostsApi(apiConfig);

const PostAdd: FC = () => {
  const router = useRouter();
  const [model, setModel] = useState<Post>({} as Post);
  const [data, setData] = useState<Category[]>();

  const save = async () => {
    setModel({ ...model, image: "", categories: [] });
    const resp = await postsApi.apiPostsPost(model);
    if (resp.status >= 200 && resp.status < 300) {
      router.push("/admin/posts");
    } else {
      // todo handle error
    }
  };

  const fetchData = async () => {
    const resp = await categoriesApi.apiCategoriesGet();
    if (resp.status !== 200) return;
    setData(resp.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PublicLayout title="add post">
      <div className="w-full">
        <div className="mr-auto">
          <Link href="/admin" legacyBehavior>
            <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-blue-500 mb-3" />
          </Link>
        </div>
        <Card title="Add post">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={model.title ?? ""}
              onChange={(val) =>
                setModel({
                  ...model,
                  title: val.target.value,
                  slug: slugify(val.target.value),
                })
              }
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Slug</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={model.slug ?? ""}
              onChange={(val) => setModel({ ...model, slug: val.target.value })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={model.desctiption ?? ""}
              onChange={(val) =>
                setModel({ ...model, desctiption: val.target.value })
              }
            ></textarea>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Categories</span>
            </label>
            {data && (
              <MultiSelect
                options={data.map((q) => {
                  return { label: q.title!, value: q.categoryId! };
                })}
                value={(model.categories ?? []).map((q) => {
                  return { label: q.title!, value: q.categoryId! };
                })}
                onChange={(val: any[]) => {
                  console.log(val);
                  const ids = val.map((q) => q.value);
                  console.log(ids);
                  setModel({
                    ...model,
                    categories: data.filter((q) => ids.includes(q.categoryId)),
                  });
                }}
                labelledBy="Select"
              />
              // <Select
              //   label="Category"
              //   items={(data ?? []).map((q) => {
              //     return { id: q.categoryId, name: q.title };
              //   })}
              //   onChange={(val) => console.log("on change", val)}
              // />
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <Wysiwyg
              onChange={(val: any) => setModel({ ...model, body: val })}
              value={model.body}
            />
          </div>
          <button className="btn btn-primary my-3" onClick={() => save()}>
            Save
          </button>
        </Card>
        {JSON.stringify(model)}
      </div>
    </PublicLayout>
  );
};

export default PostAdd;
