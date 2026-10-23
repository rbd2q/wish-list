import Image from 'next/image';

import { Brand } from '@/shared/ui/brand';

export const AuthIntro = () => (
  <section className="hidden rounded-3xl border border-border bg-surface p-10 shadow-sm md:block">
    <Brand />
    <h2 className="mt-8 text-3xl leading-tight font-semibold tracking-tight">
      Everything you love,
      <br />
      in one place.
    </h2>
    <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
      Curate your personal wishlist, keep track of things that matter, and make gift-giving effortless.
    </p>
    <div className="mt-8 grid grid-cols-3 gap-3" aria-hidden="true">
      {['blue-perfume', 'amber-perfume', 'red-sneaker'].map((image) => (
        <div key={image} className="overflow-hidden rounded-2xl border border-border bg-surface-secondary p-2">
          <Image
            src={`/images/auth/${image}.webp`}
            alt=""
            width={160}
            height={160}
            className="aspect-square w-full rounded-lg object-cover"
          />
        </div>
      ))}
    </div>
  </section>
);
