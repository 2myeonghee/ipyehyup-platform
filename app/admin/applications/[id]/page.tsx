import ApplicationDetailContent from "./content";

export function generateStaticParams() {
  const ids = ["APP-00028","APP-00027","APP-00026","APP-00025","APP-00024","APP-00023","APP-00022","APP-00021","APP-00020","APP-00019"];
  return ids.map((id) => ({ id }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ApplicationDetailContent params={params} />;
}
