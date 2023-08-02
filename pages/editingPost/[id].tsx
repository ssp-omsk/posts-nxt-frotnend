
import { Post, PostsApi } from "../../services/gen/restClient";
import { apiConfig } from "../../constants/apiConfig";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EditingPost } from "./EditingPost";

const api = new PostsApi(apiConfig);

const Editing = () => {
  const router = useRouter();
  const [data, setData] = useState<Post>();

  const fetchData = async (slug: string) => {
    const resp = await api.apiPostsSlugGet(slug);
    setData(resp.data);
  };

  useEffect(() => {
    if (router.query.id) fetchData(router.query.id as string);

  }, [router.query.id]);

  return (
    <>
      {data && (<EditingPost
        data={data as Post}
      />)}
    </>
  )
}

export default Editing;