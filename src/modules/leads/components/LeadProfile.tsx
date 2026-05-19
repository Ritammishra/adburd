"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Briefcase, Calendar, Globe, Mail, Phone, Clock, Plus, Target, User } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { LoadingState } from "@/components/cms/LoadingState";

export function LeadProfile({ id }: { id: string }) {
  const router = useRouter();
  const [lead, setLead] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`);
      const json = await res.json();
      if (json.success) {
        setLead(json.data);
      } else {
        toast.error(json.message);
        router.push("/admin/dashboard/leads");
      }
    } catch (error) {
      toast.error("Failed to fetch lead");
      router.push("/admin/dashboard/leads");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  const handleUpdateStatus = async (status: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Status updated");
        fetchLead(); // Refresh to get new activity timeline
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePriority = async (priority: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Priority updated");
        fetchLead();
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("Failed to update priority");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async () => {
    if (!noteContent.trim()) return;
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteContent }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Note added");
        setNoteContent("");
        fetchLead(); // Refresh timeline
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("Failed to add note");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <LoadingState />;
  if (!lead) return null;

  // Merge notes and activities into a single timeline sorted by date desc
  const timeline = [
    ...(lead.notes || []).map((n: any) => ({ ...n, _isNote: true })),
    ...(lead.activities || []).map((a: any) => ({ ...a, _isActivity: true }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link href="/admin/dashboard/leads" className="inline-flex items-center text-sm font-medium text-muted hover:text-dark mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Leads
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">{lead.firstName} {lead.lastName}</h1>
          {lead.company && <p className="text-lg text-muted mt-1">{lead.company}</p>}
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={lead.priority}
            onChange={(e) => handleUpdatePriority(e.target.value)}
            disabled={isUpdating}
            className={clsx(
              "px-4 py-2 rounded-xl text-sm font-bold border transition-all outline-none disabled:opacity-50",
              lead.priority === "high" ? "bg-red-50 text-red-700 border-red-200" :
              lead.priority === "medium" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
              "bg-gray-50 text-gray-700 border-gray-200"
            )}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <select 
            value={lead.status}
            onChange={(e) => handleUpdateStatus(e.target.value)}
            disabled={isUpdating}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-white border border-border focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-50"
          >
            <option value="new">New Lead</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal_sent">Proposal Sent</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Info Cards */}
        <div className="space-y-6">
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-dark mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 text-muted mr-3 shrink-0" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a>
              </div>
              {lead.phone && (
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 text-muted mr-3 shrink-0" />
                  <a href={`tel:${lead.phone}`} className="text-dark hover:underline">{lead.phone}</a>
                </div>
              )}
              {lead.website && (
                <div className="flex items-center text-sm">
                  <Globe className="w-4 h-4 text-muted mr-3 shrink-0" />
                  <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">{lead.website}</a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-dark mb-4">Lead Details</h3>
            <div className="space-y-4">
              <div className="flex items-start text-sm">
                <Target className="w-4 h-4 text-muted mr-3 shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted block text-xs uppercase tracking-wider mb-0.5">Source</span>
                  <span className="font-medium text-dark capitalize">{lead.source.replace("_", " ")}</span>
                </div>
              </div>
              {lead.budget && (
                <div className="flex items-start text-sm">
                  <Briefcase className="w-4 h-4 text-muted mr-3 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-muted block text-xs uppercase tracking-wider mb-0.5">Budget</span>
                    <span className="font-medium text-dark">{lead.budget}</span>
                  </div>
                </div>
              )}
              <div className="flex items-start text-sm">
                <Calendar className="w-4 h-4 text-muted mr-3 shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted block text-xs uppercase tracking-wider mb-0.5">Created</span>
                  <span className="font-medium text-dark">{new Date(lead.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {lead.message && (
            <div className="bg-subtle-glow border border-primary/20 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-dark mb-3">Initial Message</h3>
              <p className="text-sm text-dark italic leading-relaxed">"{lead.message}"</p>
            </div>
          )}
        </div>

        {/* Right Column: Timeline & Notes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-dark mb-4">Internal Notes</h3>
            <div className="flex flex-col gap-3">
              <textarea 
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write a note about this lead..."
                className="w-full bg-light border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-y min-h-[100px]"
              ></textarea>
              <div className="flex justify-end">
                <button 
                  onClick={handleAddNote}
                  disabled={isUpdating || !noteContent.trim()}
                  className="px-6 py-2.5 bg-dark hover:bg-black disabled:opacity-70 text-white text-sm font-medium rounded-xl transition-all shadow-sm flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Note
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-dark mb-6">Activity Timeline</h3>
            
            <div className="relative border-l border-border ml-3 space-y-8 pb-4">
              {timeline.length === 0 ? (
                <p className="text-sm text-muted ml-6">No activity recorded yet.</p>
              ) : (
                timeline.map((item: any) => (
                  <div key={item._id} className="relative pl-6">
                    {/* Timeline dot */}
                    <div className={clsx(
                      "absolute -left-2 w-4 h-4 rounded-full border-2 border-white",
                      item._isNote ? "bg-primary" : "bg-gray-300"
                    )}></div>
                    
                    <div className={clsx(
                      "rounded-xl p-4",
                      item._isNote ? "bg-primary/5 border border-primary/10" : "bg-light"
                    )}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-dark uppercase tracking-wider">
                          {item._isNote ? `Note by ${item.author}` : item.type.replace("_", " ")}
                        </span>
                        <div className="flex items-center text-xs text-muted">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(item.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <p className="text-sm text-dark">
                        {item._isNote ? item.content : item.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
