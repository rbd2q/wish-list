import { Modal } from '@heroui/react';
import Image from 'next/image';

interface PhotoPreviewProps {
  src: string;
  title: string;
  onClose: () => void;
}

export const PhotoPreview = ({ src, title, onClose }: PhotoPreviewProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
  };

  return (
    <Modal isOpen onOpenChange={handleOpenChange}>
      <Modal.Backdrop>
        <Modal.Container placement="center" className="w-[calc(100%_-_2rem)] max-w-3xl">
          <Modal.Dialog className="max-h-[90dvh] overflow-auto rounded-2xl p-4 md:p-6">
            <Modal.CloseTrigger aria-label="Close photo preview" />
            <Modal.Header className="pr-10">
              <Modal.Heading className="wrap-anywhere">{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Image
                unoptimized
                width={0}
                height={0}
                src={src}
                alt={title}
                className="h-auto max-h-[70dvh] w-full rounded-xl object-contain"
              />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
