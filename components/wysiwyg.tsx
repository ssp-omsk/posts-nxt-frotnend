import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

/**
 * https://stackoverflow.com/questions/60458247/how-to-access-reactquill-ref-when-using-dynamic-import-in-nextjs
 */

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

export function Wysiwyg({ value, onChange, ...props }) {
  const quillRef = React.useRef<ReactQuill>();

  // Custom image upload handler
  function imgHandler() {
    // from https://github.com/quilljs/quill/issues/1089#issuecomment-318066471
    const quill = quillRef.current?.getEditor();
    if(!quill) return;
    let fileInput = quill.root.querySelector("input.ql-image[type=file]") as HTMLInputElement;

    // to prevent duplicate initialization I guess
    if (fileInput === null) {
      fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute(
        "accept",
        "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
      );
      fileInput.classList.add("ql-image");

      fileInput.addEventListener("change", () => {
        const files = fileInput!.files;
        const range = quill.getSelection(true);

        if (!files || !files.length) {
          console.log("No files selected");
          return;
        }

        console.log("files[0]", files[0]);
        const url = "https://placehold.co/600x400/EEE/31343C";
        quill.enable(true);
        quill.insertEmbed(range.index, "image", url);
        quill.setSelection(range.index + 1);
        fileInput.value = "";
        quill.root.appendChild(fileInput);
        return;

        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("uid", uid);
        formData.append("img_type", "detail");
        quill.enable(false);
        console.log(files[0]);
        axios
          .post("the/url/for/handle/uploading", formData)
          .then((response) => {
            // after uploading succeed add img tag in the editor.
            // for detail visit https://quilljs.com/docs/api/#editor
            quill.enable(true);
            quill.insertEmbed(range.index, "image", response.data.url);
            quill.setSelection(range.index + 1);
            fileInput.value = "";
          })
          .catch((error) => {
            console.log("quill image upload failed");
            console.log(error);
            quill.enable(true);
          });
      });
      quill.root.appendChild(fileInput);
    }
    fileInput.click();
  }

  //  I don't know much about useMemo
  //  but if i don't use the hook,
  //  the editor keeps rerendered resulting in losing focus and I guess perfomance trouble too.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          ["bold", "italic", "underline", "strike"], // toggled buttons

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ header: 1 }, { header: 2 }], // custom button values
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],

          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ align: [] }],
          ["link", "image"],
          ["clean"], // remove formatting button
        ],
        handlers: { image: imgHandler }, // Custom image handler
      },
    }),
    []
  );

  return (
    <ReactQuill
      forwardedRef={quillRef}
      modules={modules}
      value={value}
      onChange={(value: string) => onChange(value)}
      {...props}
    />
  );
}
