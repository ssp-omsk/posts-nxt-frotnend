type Props = {
  title: string;
  description: string;
  image: string;
}

export const PostView = ({title, description, image}: Props) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <img src={image} alt="Image of post" />
    </div>
  )
}