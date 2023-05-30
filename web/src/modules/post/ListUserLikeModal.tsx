import React from "react";
import * as yup from "yup";
import { LikeDetail } from "../../types/util-types";
import { AvailableUser } from "../../ui/AvailableUser";
import { Modal } from "../../ui/Modal";

interface CreatePostModalProps {
  onRequestClose: () => void;
  likesMap: LikeDetail[];
}

export const ListUserLikeModal: React.FC<CreatePostModalProps> = ({
  onRequestClose,
  likesMap,
}) => {
  return (
    <Modal
      isOpen
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      variant="fixedHeight"
    >
      <div className="sticky">
        <h4 className={`mb-2 text-center text-primary-100`}>Người thích</h4>
        <hr className="text-primary-100" />
      </div>
      {likesMap.map((user: LikeDetail) => (
        <AvailableUser {...user} key={user.id!} />
      ))}
    </Modal>
  );
};
