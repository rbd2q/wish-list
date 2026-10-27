import { Modal, useOverlayState } from '@heroui/react';
import type { ChangeEvent } from 'react';

import type { WishListItemType } from '@/entities/wish';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useChangeMembership } from '../api';
import { MembershipAction, useExistingWishes } from '../model';
import { ExistingWishesResults } from './existing-wishes-results';

interface AddExistingWishesProps {
  items: WishListItemType[];
  collectionId: string;
  isDisabled?: boolean;
}

export const AddExistingWishes = ({ items, collectionId, isDisabled }: AddExistingWishesProps) => {
  const { isOpen, setOpen, close } = useOverlayState();
  const { search, setSearch, displayedItems, hasAvailableItems } = useExistingWishes(items, collectionId);

  const { mutate: changeMembership, isPending } = useChangeMembership(collectionId);

  const handleAddWish = (wishId: string) => {
    changeMembership({ wishId, action: MembershipAction.ADD });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOpenChange = (nextIsOpen: boolean) => {
    setSearch('');
    setOpen(nextIsOpen);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
      <Button variant="secondary" isDisabled={isDisabled} className="min-h-8! rounded-lg! px-3! py-1! text-xs!">
        Add existing wishes
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="center" className="w-[calc(100%_-_2.5rem)] max-w-xl">
          <Modal.Dialog className="max-h-[calc(100dvh-40px)] overflow-auto rounded-2xl p-5">
            <Modal.Header>
              <Modal.Heading className="text-xl font-semibold">Add your wishes</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="mb-4 text-sm text-muted-foreground">
                Wishes keep their other collections. Completed wishes can be added too.
              </p>
              <Input
                type="search"
                aria-label="Search existing wishes"
                placeholder="Search wishes…"
                value={search}
                onChange={handleSearchChange}
              />
              <ExistingWishesResults
                items={displayedItems}
                hasAvailableItems={hasAvailableItems}
                isPending={isPending}
                onAdd={handleAddWish}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onPress={close}>
                Done
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
