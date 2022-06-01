import { Fragment, useState } from "react";

export default function InputImage({ name }: { name: string }) {
  const [img, setImg] = useState({ src: "", alt: "" });

  return (
    <Fragment>
      <input
        className={img.src && "hidden"}
        type="file"
        name={name}
        onChange={(event) => {
          if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setImg({
              src: URL.createObjectURL(img),
              alt: event.target.files[0].name,
            });
          }
        }}
      />
      <img src={img.src} alt={img.alt} />
    </Fragment>
  );
}
