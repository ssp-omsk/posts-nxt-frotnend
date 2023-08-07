import { useContext } from "react";
import { Card } from "../components/@elements/card";
import { PublicLayout } from "../components/layout/publicLayout";
import { AuthContext } from "./_app";
import { SideBar } from "../components/@elements/SideBar";

export default function Home() {
  const context = useContext(AuthContext)

  return (
    <PublicLayout title="Main">
      <div className="grid grid-cols-4 xl:grid-cols-5 gap-3 w-full">
        <div className="col-span-4 mr-3">
          <div className="card shadow-xl bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                veritatis praesentium magnam impedit nostrum neque quae aut
                atque? Blanditiis cumque vel explicabo suscipit recusandae,
                doloribus dolore nulla obcaecati amet veniam! Lorem ipsum, dolor
                sit amet consectetur adipisicing elit. Hic veritatis praesentium
                magnam impedit nostrum neque quae aut atque? Blanditiis cumque
                vel explicabo suscipit recusandae, doloribus dolore nulla
                obcaecati amet veniam! Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Hic veritatis praesentium magnam impedit
                nostrum neque quae aut atque? Blanditiis cumque vel explicabo
                suscipit recusandae, doloribus dolore nulla obcaecati amet
                veniam! Lorem ipsum, dolor sit amet consectetur adipisicing
                elit. Hic veritatis praesentium magnam impedit nostrum neque
                quae aut atque? Blanditiis cumque vel explicabo suscipit
                recusandae, doloribus dolore nulla obcaecati amet veniam! Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Hic
                veritatis praesentium magnam impedit nostrum neque quae aut
                atque? Blanditiis cumque vel explicabo suscipit recusandae,
                doloribus dolore nulla obcaecati amet veniam!
              </p>
              <pre>
                {JSON.stringify(context, null ,2)}
              </pre>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:block">
          <Card title="Shoes!" image="https://placeimg.com/400/225/arch">
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </Card>
          <SideBar/>
        </div>
      </div>
    </PublicLayout>
  );
}
