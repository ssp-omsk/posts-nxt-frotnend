import Link from "next/link";
import { FC } from "react";
import { PublicLayout } from "../../components/layout/publicLayout";
import { useRouter } from "next/router";

const AdminPage: FC = () => {
  const router = useRouter();
  return (
    <PublicLayout title='admin'>
      <h2>Admin</h2>
      <button className="btn btn-primary mb-1" onClick={() => router.push("/admin/posts")}>Posts</button>
      <button className="btn btn-primary" onClick={() => router.push("/admin/categories")}>Categories</button>
    </PublicLayout>
  );
};

export default AdminPage;
