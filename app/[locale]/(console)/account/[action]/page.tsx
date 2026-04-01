type Props = {
  params: Promise<{ action: string }>;
};

function toTitle(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function AccountActionPage({ params }: Props) {
  const { action } = await params;

  return <div>{toTitle(action)}</div>;
}
