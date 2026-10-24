interface WishDescriptionProps {
  description?: string;
}

export const WishDescription = ({ description }: WishDescriptionProps) => {
  const text = description?.trim();

  if (!text) {
    return null;
  }

  return (
    <section aria-labelledby="wish-description">
      <h2 id="wish-description" className="mb-2 text-sm font-medium">
        Description
      </h2>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground wrap-anywhere">{text}</p>
    </section>
  );
};
