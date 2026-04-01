type Props = {
  params: Promise<{ section: string }>;
};

function toTitle(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function ConsoleSectionPage({ params }: Props) {
  const { section } = await params;

  return <div>{toTitle(section)}</div>;
}
