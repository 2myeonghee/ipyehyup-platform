import AdminDistrictDetailContent from "./content";

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1) }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <AdminDistrictDetailContent params={params} />;
}
