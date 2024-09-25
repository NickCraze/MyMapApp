import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface PlaceDetails {
  name: string;
  description: string;
  category: string;
  address: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

interface ModalProps {
  isOpen: boolean;
  selectedPlace: PlaceDetails | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  selectedPlace,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Place Details</DialogTitle>
      <DialogContent>
        {selectedPlace ? (
          <>
            <p>
              <strong>Name:</strong> {selectedPlace.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedPlace.description}
            </p>
            <p>
              <strong>Category:</strong> {selectedPlace.category}
            </p>
            <p>
              <strong>Address:</strong> {selectedPlace.address}
            </p>
            <p>
              <strong>Coordinates:</strong>
              <br />
              Lat: {selectedPlace.coordinates.lat}, Lon:
              {` ${selectedPlace.coordinates.lon}`}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
