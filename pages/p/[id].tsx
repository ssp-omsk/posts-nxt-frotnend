import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Post, PostsApi } from "../../services/gen/restClient";
import { apiConfig } from "../../constants/apiConfig";
import { PublicLayout } from "../../components/layout/publicLayout";
import { Card } from "../../components/@elements/card";
import { Constants } from "../../constants/constants";

const api = new PostsApi(apiConfig);

const PostView = () => {
  const router = useRouter();
  const [data, setData] = useState<Post>();

  const fetchData = async (slug: string) => {
    const resp = await api.apiPostsSlugGet(slug);
    setData(resp.data);
  };

  useEffect(() => {
    if (router.query.id) fetchData(router.query.id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);
  console.log(JSON.stringify(data));
  return (
    <PublicLayout title={data?.title ?? ""}>
      <div className="w-full">
        <Card title={data?.title ?? ""}>
          <div className="flex flex-col justify-between w-full">
            {/* <p className="mb-5 text-lg">{data?.desctiption}</p> */}
            {(data?.image?.length ?? 0) > 255 && (
              <img
                className="rounded-xl mb-3"
                src={data!.image!}
                alt={data?.title ?? ""}
              />
            )}
            {(data?.image?.length ?? 0) < 255 &&
              (data?.image?.length ?? 0) > 0 && (
                <img
                  className="rounded-xl mb-3"
                  src={Constants.basePath + data!.image!}
                  alt={data?.title ?? ""}
                />
              )}
            {!!data?.body && (
              <div dangerouslySetInnerHTML={{ __html: data!.body }} />
            )}
          </div>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default PostView;
