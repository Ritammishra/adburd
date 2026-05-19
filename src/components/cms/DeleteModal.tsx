"use client";

import React from "react";
import { ConfirmModal } from "./ConfirmModal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  isLoading?: boolean;
}

export function DeleteModal({ isOpen, onClose, onConfirm, itemName, isLoading }: DeleteModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Item"
      description={`Are you sure you want to delete "${itemName}"? This action cannot be undone.`}
      confirmText="Delete"
      isDestructive={true}
      isLoading={isLoading}
    />
  );
}
