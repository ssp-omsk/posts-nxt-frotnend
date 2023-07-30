import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { PublicLayout } from "../../../components/layout/publicLayout";
import { Card } from "../../../components/@elements/card";
import { Post, PostsApi } from "../../../services/gen/restClient";
import { useEffect, useState } from "react";
import { apiConfig } from "../../../constants/apiConfig";


const api = new PostsApi(apiConfig)

const PostView = () => {
  const router = useRouter();
  const [data, setData] = useState<Post>();

  const fetchData = async () => {
    const resp = await api.apiPostsIdGet(+(router.query.id ?? ""));
    if (resp.status !== 200) {
      router.push("/admin/posts");
    }
    setData(resp.data);
  };

  useEffect(() => {
    fetchData();

  }, []);
  console.log(JSON.stringify(data))
  return (

    <PublicLayout title={'View post'} >
      <div className="mr-auto">
        <Link href="/admin/posts" legacyBehavior>
          <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-blue-500 mb-3" />
        </Link>
      </div>
      <Card title="Post">
        <div className="flex flex-col justify-between w-full">

          <h2 className="card-title mb-5">{data?.title}</h2>
          <p className="mb-5 text-lg">{data?.desctiption}</p>
          <img className="max-w-7xl" src={(data?.image ?? '') ? data?.image ?? '' : 'https://www.meme-arsenal.com/memes/c00af80a80f31bb3d6ca07553f7795e7.jpg'} alt="Image of post" />
        </div>
      </Card>
    </PublicLayout>
  )
}

export default PostView;