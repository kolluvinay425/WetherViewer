// StyledComponents.js
import styled, { keyframes } from "styled-components";

export const CancelUpload = styled.div`
  width: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

export const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  padding: 10px;
  object-fit: contain;
`;

export const EditIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
`;

export const DeleteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
`;

export const BackIcon = styled.div`
  position: absolute;
  top: 40%;
  left: 1px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 50%;
  font-size: 20px;
  font-display: inherit;
  cursor: pointer;
`;

export const ItemHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #444;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

export const ItemDetails = styled.div`
  padding: 15px;
  background-color: #555;
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  margin-bottom: 10px;
`;

export const Points = styled.p`
  margin-bottom: 10px;
`;

export const Hardness = styled.p`
  margin-bottom: 10px;
`;

export const RewardsTitle = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const AchievementItemContainer = styled.div`
  margin-bottom: 20px;
  background-color: #333;
  border-radius: 8px;
  overflow: hidden;
  color: white;
`;

export const Rewards = styled.p`
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #f0db4f;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;

  &:hover {
    background-color: #d9c12e;
  }
`;

export const UploadButton = styled(Button)`
  margin-top: 10px;
  width: 70%;
  align-self: left;
`;

export const ModalContent = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 100%;
  margin: 10px;
`;

export const ModalTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const ModalDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const Card = styled.div`
  margin-left: 10px;
  width: 120px;
  height: 120px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  background-color: #222;
  color: white;
  transition: 0.3s;

  &:hover {
    border-color: #f0db4f;
    background-color: #333;
  }
`;

export const PlusIcon = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #f0db4f;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
