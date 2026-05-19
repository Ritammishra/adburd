import connectDB from "@/lib/db";
import Lead from "@/models/Lead";
import { Users, UserPlus, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

// Ensure this page is dynamically rendered so stats are always up to date
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await connectDB();

  // Fetch stats concurrently
  const [totalLeads, newLeads, convertedLeads, recentLeads] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: "new" }),
    Lead.countDocuments({ status: "converted" }),
    Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  const statusColors: any = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    qualified: "bg-purple-100 text-purple-700",
    proposal_sent: "bg-indigo-100 text-indigo-700",
    converted: "bg-green-100 text-green-700",
    lost: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-dark mb-6">CRM Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-muted uppercase tracking-wider mb-1">Total Leads</div>
            <div className="text-3xl font-black text-dark">{totalLeads}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 mr-4 shrink-0">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-muted uppercase tracking-wider mb-1">New Leads</div>
            <div className="text-3xl font-black text-dark">{newLeads}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-4 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-muted uppercase tracking-wider mb-1">Converted</div>
            <div className="text-3xl font-black text-dark">{convertedLeads}</div>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold text-dark">Recent Inquiries</h2>
          <Link href="/admin/dashboard/leads" className="text-sm font-medium text-primary hover:underline flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        {recentLeads.length === 0 ? (
          <div className="p-8 text-center text-muted">No leads have been captured yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-dark">
              <thead className="text-xs text-muted uppercase bg-light border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Source</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead: any) => (
                  <tr key={lead._id.toString()} className="border-b border-border hover:bg-light/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-dark">{lead.firstName} {lead.lastName}</div>
                      {lead.company && <div className="text-xs text-muted mt-0.5">{lead.company}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-dark">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-sm font-medium">{lead.source.replace("_", " ")}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx("px-2.5 py-1 text-xs font-bold rounded-full capitalize", statusColors[lead.status] || "bg-gray-100 text-gray-700")}>
                        {lead.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
