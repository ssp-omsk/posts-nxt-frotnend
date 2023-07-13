import { FC, useEffect, useState } from "react";
import { PublicLayout } from "../../../components/layout/publicLayout";
import { Card } from "../../../components/@elements/card";
import { CategoriesApi, Category } from "../../../services/gen/restClient";
import { apiConfig } from "../../../constants/apiConfig";
import { useRouter } from "next/router";

var slugify = require("slugify");
const api = new CategoriesApi(apiConfig);

const CategoryEdit: FC = () => {
  const router = useRouter();
  const [model, setModel] = useState<Category>({} as Category);
  const [data, setData] = useState<Category[]>();

  const save = async () => {
    const resp = await api.apiCategoriesIdPut(model.categoryId!, model);
    if (resp.status >= 200 && resp.status < 300) {
      router.push("/admin/categories");
    } else {
      // todo handle error
    }
  };

  const fetchData = async () => {
    const respModel = await api.apiCategoriesIdGet(+(router.query.id ?? ""));
    if (respModel.status === 200) setModel(respModel.data);
    const resp = await api.apiCategoriesGet();
    if (resp.status !== 200) return;
    setData(resp.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PublicLayout title="add post">
      <div className="w-full">
        <Card title="Add Category">
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
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Parent category</span>
            </label>
            <select
              className="select w-full max-w-xs"
              disabled={data?.length === 0}
              onChange={(val) => {
                console.log(val.target.value);
                val.target.value == ""
                  ? setModel({ ...model, parentCategoryId: null })
                  : setModel({ ...model, parentCategoryId: +val.target.value });
              }}
            >
              <option value={""}>No parent</option>
              {data?.map((v, i) => (
                <option
                  key={i}
                  value={v.categoryId}
                  selected={v.categoryId == model.parentCategoryId}
                >
                  {v.title}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary my-3" onClick={() => save()}>
            Save
          </button>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default CategoryEdit;
