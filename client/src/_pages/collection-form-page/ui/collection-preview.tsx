import { type Control, useWatch } from 'react-hook-form';

import {
  type Collection,
  CollectionCard,
  CollectionColor,
  CollectionIcon,
  type CollectionValues,
} from '@/entities/collection';

interface CollectionPreviewProps {
  control: Control<CollectionValues>;
  collection?: Collection;
}

export const CollectionPreview = ({ control, collection }: CollectionPreviewProps) => {
  const { name, description, icon, color } = useWatch({ control });

  const preview = {
    name: name?.trim() || 'Collection name',
    description: description?.trim() || 'Collection description…',
    icon: icon ?? CollectionIcon.HOUSE,
    color: color ?? CollectionColor.EMERALD,
    wishCount: collection?.wishCount ?? 0,
    previewImages: collection?.previewImages ?? [],
  };

  return (
    <aside aria-label="Collection preview" className="min-w-0 space-y-4 lg:sticky lg:top-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preview</p>
      <CollectionCard collection={preview} />
      <div className="rounded-2xl bg-primary/5 p-5 text-sm text-muted-foreground">
        <p className="mb-2 font-medium text-foreground">Tip</p>
        <p>Wishes can belong to multiple collections. Use collections to organize by theme, event, or person.</p>
      </div>
    </aside>
  );
};
