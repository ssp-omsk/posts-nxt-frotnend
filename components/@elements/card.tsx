import { FC, PropsWithChildren } from "react";

interface CardProps {
  title?: string;
  image?: string;
  className?: string;
}

export const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  title,
  image,
  className
}) => {
  return (
    <div className={"card shadow-xl bg-base-300 mb-6 " + className}>
      {image && (
        <figure>
          <img src={image} alt={title} />
        </figure>
      )}
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
      </div>
    </div>
  );
};
