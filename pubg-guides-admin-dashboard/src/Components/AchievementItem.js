import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ModalContentData from "./ModalContent";
import {
  AchievementItemContainer,
  ItemHeader,
  ItemDetails,
  ItemImage,
  Description,
  Points,
  Hardness,
  RewardsTitle,
  Rewards,
  ButtonContainer,
  Button,
} from "./StyledComponents";

const AchievementItem = ({ achievement, onClick, expanded, handleUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [newImage, setNewImage] = useState({}); // Store new image per index
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});

  useEffect(() => {
    return () => {
      Object.values(images)
        .flat()
        .forEach((file) => {
          if (file instanceof File) {
            URL.revokeObjectURL(file); // Free memory
          }
        });
    };
  }, [images]);

  const openModal = (data, type) => {
    setModalData({ data, type }); // Corrected here
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const removeImage = (id, index) => {
    setImages((prevImages) => {
      if (!prevImages[id]) return prevImages; // If no images for the ID, return as is

      const updatedImages = prevImages[id].filter((_, i) => i !== index); // Remove the file at index

      return {
        ...prevImages,
        [id]: updatedImages.length ? updatedImages : undefined, // Remove key if empty
      };
    });
  };

  const handleImagesChange = (event, id) => {
    const files = event.target.files;
    if (files.length > 0) {
      const fileArray = Array.from(files); // Convert FileList to Array

      setImages((prevImages) => ({
        ...prevImages,
        [id]: [...(prevImages[id] || []), ...fileArray], // Store File objects, NOT blob URLs
      }));
    }
  };

  const handleImageChange = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage((prev) => ({ ...prev, [idx]: file })); // Update only specific index
    }
  };

  const handleImageUpload = async (id, oldImageUrl, idx) => {
    const endpointType =
      modalData?.type === "tips-tricks" ? "tips-tricks" : "requirements";
    if (!newImage[idx]) return;

    const formData = new FormData();
    formData.append("image", newImage[idx]);
    formData.append("oldImageUrl", oldImageUrl);
    formData.append("id", id);

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3001/api/${endpointType}/${id}/image`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        setNewImage((prev) => ({ ...prev, [idx]: null })); // Clear the specific index
        setLoading(false);
        // closeModal();
      } else {
        alert("Failed to update image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    } finally {
      if (endpointType === "tips-tricks") {
        getTipsTricks(achievement.id);
      } else {
        getRequirements(achievement.id);
      }
      handleUpdate();
    }
  };

  const handleImageDeletion = async (id, imageUrl, idx) => {
    setLoadingImages((prev) => ({ ...prev, [idx]: true })); // Set loading only for this image
    const endpointType =
      modalData?.type === "tips-tricks" ? "tips-tricks" : "requirements";
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3001/api/${endpointType}/${id}/image`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        }
      );
      if (response.ok) {
        setNewImage((prev) => ({ ...prev, [idx]: null })); // Clear the specific index
        // closeModal();
        setLoading(false);
      } else {
        alert("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("An error occurred while deleting the image.");
    } finally {
      setLoadingImages((prev) => ({ ...prev, [idx]: false })); // Reset loading for this image
      if (endpointType === "tips-tricks") {
        getTipsTricks(achievement.id);
      } else {
        getRequirements(achievement.id);
      }
      handleUpdate();
    }
  };

  const uploadMultipleImages = async (id) => {
    const endpointType =
      modalData?.type === "tips-tricks" ? "tips-tricks" : "requirements";
    if (!images[id] || !Array.isArray(images[id]) || images[id].length === 0) {
      alert("No images selected for upload.");
      return;
    }

    const formData = new FormData();
    images[id].forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image); // Now we are sending actual File objects
      } else {
        console.warn("Skipping non-file object:", image);
      }
    });

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/${endpointType}/${id}/images`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        setImages((prev) => ({ ...prev, [id]: [] })); // Clear images for this ID only
        setLoading(false);
      } else {
        alert("Failed to upload images");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("An error occurred while uploading the images.");
    } finally {
      if (endpointType === "tips-tricks") {
        getTipsTricks(achievement.id);
      } else {
        getRequirements(achievement.id);
      }
      handleUpdate();
    }
  };
  const [requirements, setRequirements] = useState(null);
  const [tips, setTips] = useState(null);

  const getRequirements = (achievementId) => {
    fetch(`http://localhost:3001/api/requirements/${achievementId}/all`)
      .then((response) => response.json())
      .then((data) => {
        setRequirements(data.requirements);
        setTimeout(() => openModal(data.requirements, "requirements"), 0); // Ensure state is updated before opening
      })
      .catch((error) => {
        console.error("Error fetching requirements:", error);
      });
  };

  const getTipsTricks = (achievementId) => {
    fetch(`http://localhost:3001/api/tips-tricks/${achievementId}/all`)
      .then((response) => response.json())
      .then((data) => {
        setTips(data.tipsTricks);
        setTimeout(() => openModal(data.tipsTricks, "tips-tricks"), 0); // Ensure state is updated before opening
      })
      .catch((error) => {
        console.error("Error fetching tips & tricks:", error);
      });
  };

  return (
    <AchievementItemContainer>
      <ItemHeader onClick={onClick}>
        <span>{achievement.name.en}</span>

        <span>{expanded ? "▲" : "▼"}</span>
      </ItemHeader>

      {expanded && (
        <ItemDetails>
          {achievement.image && (
            <ItemImage src={achievement.image} alt="Achievement" />
          )}
          <span>Id: {achievement.id}</span>

          <Description>{achievement.description.en}</Description>
          <Points>Points: {achievement.points}</Points>
          <Hardness>Hardness: {achievement.hardness.en}</Hardness>
          <RewardsTitle>Rewards:</RewardsTitle>
          <Rewards>{achievement.rewards.extra.en}</Rewards>

          <ButtonContainer>
            <Button onClick={() => getRequirements(achievement.id)}>
              View Requirements
            </Button>
            <Button onClick={() => getTipsTricks(achievement.id)}>
              View Tips
            </Button>
          </ButtonContainer>
        </ItemDetails>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Details Modal"
        style={{
          content: {
            width: "80%", // Set modal width to 60%
            maxWidth: "100%", // Optional: Set a max width
            margin: "auto", // Center the modal horizontally
            backgroundColor: "#545755", // Keep your existing styles
            color: "white",
            borderRadius: "8px",
            padding: "20px",
          },
        }}
      >
        {modalData && (
          <h1
            style={{
              width: "50%",
              padding: "5px",
            }}
          >
            {achievement.name.en} : {modalData.type}
          </h1>
        )}

        {modalData?.data &&
          modalData.data.length > 0 &&
          modalData.data.map((data, index) => (
            <ModalContentData
              index={index}
              data={data}
              newImage={newImage}
              handleImageDeletion={handleImageDeletion}
              modalData={modalData}
              handleImageChange={handleImageChange}
              handleImageUpload={handleImageUpload}
              setNewImage={setNewImage}
              handleImagesChange={handleImagesChange}
              images={images}
              uploadMultipleImages={uploadMultipleImages}
              loading={loading}
              handleUpdate={handleUpdate}
              removeImage={removeImage}
              loadingImages={loadingImages}
              handleClose={() => {
                setIsModalOpen(false);
              }}
            />
          ))}
      </Modal>
    </AchievementItemContainer>
  );
};

export default AchievementItem;
