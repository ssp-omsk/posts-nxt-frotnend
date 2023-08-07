import Link from "next/link";
import { PublicLayout } from "../../components/layout/publicLayout";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Card } from "../../components/@elements/card";
import ImageCropper from "../../components/@elements/imageCropper";
import { Wysiwyg } from "../../components/wysiwyg";
import { Post } from "../../services/gen/restClient";
import { useState } from "react";

type Props = {
  data: Post;
}

export const EditingPost = (props: Props) => {

  const [data, setData] = useState(props.data);

  return (
    <PublicLayout title="editing post">
      <div className="w-full">
        <div className="mr-auto">
          <Link href="/admin" legacyBehavior>
            <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-blue-500 mb-3" />
          </Link>
        </div>
        <Card title=" Editing post">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={data.title ?? ''}
                  onChange={(e) => { setData({ ...data, title: e.currentTarget.value }) }}
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
                  value={data.slug ?? ''}
                  onChange={(e) => { setData({ ...data, slug: e.currentTarget.value }) }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  value={data.desctiption ?? ''}
                  onChange={(e) => { setData({ ...data, desctiption: e.currentTarget.value }) }}
                ></textarea>
              </div>
            </div>

            <ImageCropper saveImg={(img) => setData({ ...data, image:img })} />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <Wysiwyg
              value={data.body}
              onChange={(e: any) => { setData({ ...data, body: e }) }}
            />
          </div>
        </Card>
      </div>
    </PublicLayout>
  )

}