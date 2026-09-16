type ChordNameProps = {
  name: string;
};

export function ChordName({ name }: ChordNameProps) {
  return (
    <h2
      data-testid="chord-name"
      className="min-h-10 text-center text-3xl font-bold text-background-fg sm:text-4xl"
    >
      {name}
    </h2>
  );
}
