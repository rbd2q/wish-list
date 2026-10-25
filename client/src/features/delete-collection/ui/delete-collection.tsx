'use client';

import { Modal, useOverlayState } from '@heroui/react';
import { useId } from 'react';

import { getApiErrorMessage } from '@/shared/api';
import { Button } from '@/shared/ui/button';

import { useDeleteCollection } from '../api';

interface DeleteCollectionProps {
  id: string;
  name: string;
  onDeleted?: () => void;
  isDisabled?: boolean;
}

export const DeleteCollection = ({ id, name, onDeleted, isDisabled }: DeleteCollectionProps) => {
  const { isOpen, setOpen, close: closeDialog } = useOverlayState();
  const descriptionId = useId();
  const { mutate: deleteCollection, isPending, isError, error, reset } = useDeleteCollection(id);

  const handleOpenChange = (nextIsOpen: boolean) => {
    if (isPending) return;

    if (nextIsOpen) reset();

    setOpen(nextIsOpen);
  };

  const handleDelete = () => {
    if (isPending) return;

    deleteCollection(undefined, {
      onSuccess: () => {
        closeDialog();
        onDeleted?.();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
      <Button type="button" variant="danger-soft" isDisabled={isDisabled} aria-label={`Delete ${name}`}>
        Delete collection
      </Button>
      <Modal.Backdrop isDismissable={!isPending} isKeyboardDismissDisabled={isPending}>
        <Modal.Container placement="center" className="w-[calc(100%_-_2.5rem)] max-w-md">
          <Modal.Dialog
            role="alertdialog"
            aria-describedby={descriptionId}
            className="max-h-[calc(100dvh-40px)] overflow-auto rounded-2xl p-6">
            <Modal.Header>
              <Modal.Heading className="text-xl font-semibold">Delete collection?</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p id={descriptionId} className="text-sm wrap-anywhere text-muted-foreground">
                “{name}” will be deleted. Your wishes will stay in your wishlist and in their other collections.
              </p>
              {isError && (
                <p role="alert" className="mt-4 text-sm text-destructive">
                  {getApiErrorMessage(error, 'Could not delete the collection. Try again.')}
                </p>
              )}
            </Modal.Body>
            <Modal.Footer className="flex flex-wrap justify-end gap-3">
              <Button type="button" variant="secondary" onPress={closeDialog} isDisabled={isPending} autoFocus>
                Cancel
              </Button>
              <Button type="button" variant="danger" onPress={handleDelete} isDisabled={isPending}>
                {isPending ? 'Deleting…' : 'Delete collection'}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
