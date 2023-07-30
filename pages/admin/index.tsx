import { FC } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "../../components/layout/adminLayout";

const AdminPage: FC = () => {
  const router = useRouter();
  return (
    <AdminLayout title='admin'>
      <div className="flex">
        <h2>Admin</h2>
        <button className="btn btn-primary mb-1" onClick={() => router.push("/admin/posts")}>Posts</button>
        <button className="btn btn-primary" onClick={() => router.push("/admin/categories")}>Categories</button>


      </div>
    </AdminLayout>
  );
};

export default AdminPage;
