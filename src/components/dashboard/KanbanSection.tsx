'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Briefcase, Lock, CheckCircle, Clock, ArrowRight, UserCheck, Send, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { fetchApi } from '@/services/api';

export const KanbanSection: React.FC = () => {
  const [isLoadingGigs, setIsLoadingGigs] = useState(false);

  const initialMockTasks = [
    {
      id: 'gig_1',
      title: 'Design Dark Mode Glassmorphism Dashboard UI',
      category: 'UI/UX Design',
      budget: 350,
      clientName: 'Moloy Paul',
      status: 'OPEN', // OPEN | IN_PROGRESS | UNDER_REVIEW | COMPLETED
      applicantCount: 4,
      assignedFreelancer: null
    },
    {
      id: 'gig_2',
      title: 'Integrate Express SSE Stream & TanStack Query',
      category: 'Web Development',
      budget: 450,
      clientName: 'Arafat Rahman',
      status: 'IN_PROGRESS',
      applicantCount: 6,
      assignedFreelancer: 'Sharif Ahmed'
    },
    {
      id: 'gig_3',
      title: 'Build AI Dispute Mediator Gemini API Agent',
      category: 'AI / Machine Learning',
      budget: 500,
      clientName: 'Tanvir Hossain',
      status: 'UNDER_REVIEW',
      applicantCount: 2,
      assignedFreelancer: 'Sharif Ahmed'
    },
    {
      id: 'gig_4',
      title: 'Setup MongoDB Atomic Wallet Transaction Services',
      category: 'Backend Node.js',
      budget: 400,
      clientName: 'Moloy Paul',
      status: 'COMPLETED',
      applicantCount: 5,
      assignedFreelancer: 'Sharif Ahmed'
    }
  ];

  const [tasks, setTasks] = useState(initialMockTasks);

  // Fetch live gigs from Express API
  useEffect(() => {
    const loadGigs = async () => {
      try {
        setIsLoadingGigs(true);
        const res = await fetchApi('/gigs');
        if (res.success && res.data?.gigs && res.data.gigs.length > 0) {
          const mapped = res.data.gigs.map((g: any) => ({
            id: g._id || g.id,
            title: g.title,
            category: g.category,
            budget: g.budget,
            clientName: g.client?.name || 'Client',
            status: g.status || 'OPEN',
            applicantCount: 3,
            assignedFreelancer: g.assignedFreelancer?.name || null
          }));
          setTasks(mapped);
        }
      } catch (err) {
        console.warn('[KanbanSection] Express API offline, using fallback list');
      } finally {
        setIsLoadingGigs(false);
      }
    };
    loadGigs();
  }, []);

  const moveTask = async (taskId: string, newStatus: string) => {
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus as any } : t))
    );

    try {
      if (newStatus === 'IN_PROGRESS') {
        await fetchApi(`/gigs/${taskId}/assign`, { method: 'POST', body: JSON.stringify({ proposalId: 'prop_demo' }) });
        toast.info('Freelancer assigned & Kanban updated to IN_PROGRESS');
      } else if (newStatus === 'UNDER_REVIEW') {
        await fetchApi(`/gigs/${taskId}/submit`, { method: 'POST', body: JSON.stringify({ proofSubmission: 'https://github.com/demo/proof' }) });
        toast.info('Work submitted & Kanban updated to UNDER_REVIEW');
      } else if (newStatus === 'COMPLETED') {
        await fetchApi(`/gigs/${taskId}/approve`, { method: 'POST' });
        toast.success('Gig Approved! Escrow Payment released to Freelancer & Status COMPLETED!');
      }
    } catch {
      toast.info(`Kanban Status updated to ${newStatus}`);
    }
  };

  const columns = [
    { key: 'OPEN', title: 'Open Gigs', icon: <Briefcase className="w-4 h-4 text-indigo-400" />, variant: 'primary' as const },
    { key: 'IN_PROGRESS', title: 'In Progress', icon: <Clock className="w-4 h-4 text-amber-400" />, variant: 'warning' as const },
    { key: 'UNDER_REVIEW', title: 'Under Review', icon: <UserCheck className="w-4 h-4 text-sky-400" />, variant: 'info' as const },
    { key: 'COMPLETED', title: 'Completed & Paid', icon: <CheckCircle className="w-4 h-4 text-emerald-400" />, variant: 'success' as const }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-400" /> Micro-Tasking & Interactive Kanban Board
        </h2>
        <p className="text-sm text-slate-400">Post gigs with Escrow budget locking and track live work progress from request to completion</p>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="flex flex-col gap-3 p-3 bg-slate-900/50 border border-slate-800/80 rounded-2xl min-h-[500px]">
              <div className="flex items-center justify-between px-2 py-1 pb-2 border-b border-slate-800">
                <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  {col.icon} {col.title}
                </span>
                <Badge variant={col.variant}>{colTasks.length}</Badge>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.map((gig) => (
                  <Card key={gig.id} className="p-4 bg-slate-900 border-slate-800 hover:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-400">{gig.category}</span>
                      <Badge variant="success" icon={<Lock className="w-3 h-3" />}>
                        ${gig.budget} Escrow
                      </Badge>
                    </div>

                    <h4 className="text-sm font-bold text-slate-100 mb-2 leading-snug">{gig.title}</h4>
                    <p className="text-xs text-slate-400 mb-3">Client: {gig.clientName}</p>

                    {gig.assignedFreelancer && (
                      <div className="text-xs text-indigo-300 bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-500/20 mb-3">
                        Assigned: {gig.assignedFreelancer}
                      </div>
                    )}

                    {/* Action Controls */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      {gig.status === 'OPEN' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                          onClick={() => moveTask(gig.id, 'IN_PROGRESS')}
                        >
                          Select Freelancer
                        </Button>
                      )}

                      {gig.status === 'IN_PROGRESS' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full"
                          rightIcon={<Send className="w-3.5 h-3.5" />}
                          onClick={() => moveTask(gig.id, 'UNDER_REVIEW')}
                        >
                          Submit Work
                        </Button>
                      )}

                      {gig.status === 'UNDER_REVIEW' && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full"
                          rightIcon={<CheckCircle className="w-3.5 h-3.5" />}
                          onClick={() => moveTask(gig.id, 'COMPLETED')}
                        >
                          Approve & Pay Escrow
                        </Button>
                      )}

                      {gig.status === 'COMPLETED' && (
                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mx-auto">
                          <CheckCircle className="w-4 h-4" /> Escrow Funds Released
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
