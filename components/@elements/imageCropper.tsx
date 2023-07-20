import * as React from "react";
import { useState } from "react";

import Cropper from "react-cropper";
import { apiConfig } from "../../constants/apiConfig";
import "cropperjs/dist/cropper.css";

interface IImageCropper {
  image?: string;
  saveImg: (s: string) => void;
}

const ImageCropper: React.FC<IImageCropper> = (props) => {
  const fileInput = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const [isImage, setIsImage] = useState(false);

  const [show, setShow] = useState(false);

  if (props.image && !isImage) {
    setIsImage(true);
    setImage(apiConfig.basePath + props.image);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (!files || files.length === 0) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
    handleShow();
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());

      props.saveImg(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="w-full h-full relative">
      <div>
        {(cropData.length > 10 || image.length > 10) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="w-full h-auto rounded-lg"
            src={cropData.length > 10 ? cropData : image}
            alt="cropped"
          />
        )}
      </div>
      <div className="mt-2 absolute right-0 bottom-0 opacity-70">
        <button
          className="btn btn-primary mr-2"
          disabled={!image}
          onClick={() => handleShow()}
        >
          Обрезать
        </button>
        <button
          className="btn btn-primary mr-2"
          onClick={() => fileInput?.current && fileInput?.current?.click()}
        >
          Загрузить
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setImage("");
            setIsImage(false);
            setCropData("#");
            setCropper(undefined);
          }}
        >
          Сбросить
        </button>
        <input
          style={{ display: "none" }}
          ref={fileInput}
          type="file"
          onChange={onChange}
        />
      </div>
      <div>
        <dialog
          className={
            "modal" +
            (show
              ? " visible opacity-100 pointer-events-auto fixed w-auto h-auto"
              : "")
          }
        >
          <form method="dialog" className="modal-box">
            <Cropper
              style={{ height: 400, width: "100%" }}
              aspectRatio={16/9}
              preview=".img-preview"
              src={image}
              viewMode={1}
              guides={true}
              // minCropBoxHeight={10}
              // minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />

            <button
              className="btn btn-primary"
              onClick={() => {
                getCropData();
                handleClose();
              }}
            >
              Закрыть
            </button>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};
export default ImageCropper;
