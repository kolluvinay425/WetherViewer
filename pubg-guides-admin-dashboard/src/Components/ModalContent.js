import React from "react";
import {
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalImage,
  ImageContainer,
  DeleteIcon,
  EditIcon,
  UploadButton,
  CancelUpload,
  Card,
  PlusIcon,
  CardContainer,
  ImagePreview,
  LoadingContainer,
  Spinner,
  BackIcon,
} from "./StyledComponents";

function ModalContentData({
  index,
  data,
  newImage,
  handleImageDeletion,
  modalData,
  handleImageChange,
  handleImageUpload,
  setNewImage,
  handleImagesChange,
  images,
  uploadMultipleImages,
  loading,
  removeImage,
  handleClose,
}) {
  return (
    <ModalContent key={index}>
      <ModalTitle>ID: {data.id}</ModalTitle>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {data.image &&
          data.image.length > 0 &&
          data.image.map((img, idx) => (
            <div key={idx}>
              <ImageContainer>
                {!newImage[idx] && (
                  <>
                    <DeleteIcon
                      onClick={() =>
                        handleImageDeletion(data.id, img, idx, modalData.type)
                      }
                    >
                      ❌
                    </DeleteIcon>

                    {loading && (
                      <LoadingContainer>
                        <Spinner />
                      </LoadingContainer>
                    )}
                  </>
                )}
                <ModalImage src={img} alt={`Image ${img}`} />
                {!newImage[idx] && (
                  <>
                    <EditIcon
                      onClick={() =>
                        document.getElementById(`image-upload-${idx}`).click()
                      }
                    >
                      ✏️
                    </EditIcon>
                  </>
                )}
              </ImageContainer>

              {/* File input for image upload */}
              <input
                type="file"
                id={`image-upload-${idx}`}
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e, idx)}
              />

              {/* Upload Button below image */}
              {newImage[idx] && (
                <div>
                  <p
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {newImage[idx].name}
                  </p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <UploadButton
                      onClick={() => handleImageUpload(data.id, img, idx)}
                    >
                      Update Image
                    </UploadButton>
                    {loading && (
                      <LoadingContainer>
                        <Spinner />
                      </LoadingContainer>
                    )}
                    <CancelUpload onClick={() => setNewImage({})}>
                      ❌
                    </CancelUpload>
                  </div>
                </div>
              )}
              <BackIcon onClick={handleClose}>❌</BackIcon>
            </div>
          ))}
        <input
          type="file"
          id={`image-upload-${data.id}`} // Unique ID per tipTrick
          style={{ display: "none" }}
          onChange={(e) => handleImagesChange(e, data.id)}
        />
        <CardContainer>
          {(images[data.id] || []).map((image, index) => (
            <Card key={index}>
              <ImagePreview
                src={URL.createObjectURL(image)} // Generate preview URL dynamically
                alt={`Uploaded ${index}`}
              />
              <CancelUpload onClick={() => removeImage(data.id, index)}>
                ❌
              </CancelUpload>
              {loading && (
                <LoadingContainer>
                  <Spinner />
                </LoadingContainer>
              )}
            </Card>
          ))}
          {/* Upload Card (should be aligned properly now) */}
          <label
            htmlFor={`image-upload-${data.id}`}
            style={{ display: "flex" }}
          >
            <Card>
              <PlusIcon>+</PlusIcon>
            </Card>
          </label>
          {/* Upload Button (now appears only once) */}
          {images[data.id] && images[data.id].length > 0 && (
            <UploadButton onClick={() => uploadMultipleImages(data.id)}>
              Upload Images
            </UploadButton>
          )}
        </CardContainer>
      </div>

      <ModalTitle>{data.heading.en}</ModalTitle>
      <ModalDescription>{data.description.en}</ModalDescription>
    </ModalContent>
  );
}

export default ModalContentData;
