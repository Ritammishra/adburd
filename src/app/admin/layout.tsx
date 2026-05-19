import Providers from "@/components/admin/layout/Providers";

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
