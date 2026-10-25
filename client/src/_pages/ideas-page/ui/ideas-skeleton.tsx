import clsx from 'clsx';

const skeletonImages = [
  { id: 'portrait', aspectRatioClass: 'aspect-[3/4]' },
  { id: 'square', aspectRatioClass: 'aspect-square' },
  { id: 'tall-portrait', aspectRatioClass: 'aspect-[2/3]' },
  { id: 'landscape', aspectRatioClass: 'aspect-[4/3]' },
  { id: 'wide-landscape', aspectRatioClass: 'aspect-video' },
  { id: 'second-square', aspectRatioClass: 'aspect-square' },
];

export const IdeasSkeleton = () => (
  <div aria-busy="true" className="w-full">
    <span role="status" className="sr-only">
      Loading ideas…
    </span>
    <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
      {skeletonImages.map(({ id, aspectRatioClass }) => (
        <div key={id} className="animate-pulse overflow-hidden rounded-2xl border border-border bg-surface">
          <div className={clsx('bg-surface-secondary', aspectRatioClass)} />
          <div className="space-y-3 p-3">
            <div className="h-4 w-3/4 rounded bg-surface-secondary" />
            <div className="ml-auto h-3 w-16 rounded bg-surface-secondary" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
