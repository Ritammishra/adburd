import { LeadProfile } from "@/modules/leads/components/LeadProfile";

export const metadata = {
  title: "Lead Details | Adburd Admin",
};

export default async function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <LeadProfile id={resolvedParams.id} />;
}
