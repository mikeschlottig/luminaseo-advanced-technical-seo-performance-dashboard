import React, { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useSEOStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Plus, Database, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
export default function TaskManager() {
  const tasks = useSEOStore(s => s.tasks);
  const fetchTasks = useSEOStore(s => s.fetchTasks);
  const createTask = useSEOStore(s => s.createTask);
  const toggleTask = useSEOStore(s => s.toggleTask);
  const [newDomain, setNewDomain] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  const handleCreate = async () => {
    if (!newDomain) return;
    await createTask(newDomain);
    setNewDomain("");
    setOpen(false);
  };
  return (
    <AppLayout container className="bg-slate-50/50 min-h-screen">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Task Manager</h1>
            <p className="text-muted-foreground text-sm">Manage bulk domain crawl sessions and schedules.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                <Plus className="size-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start New Crawl</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input 
                  placeholder="domain.com" 
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
                <Button className="w-full" onClick={handleCreate}>Start Crawl</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card key={task.id} className="shadow-sm border-muted">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Database className="size-4" />
                  </div>
                  <CardTitle className="text-sm font-bold truncate max-w-[150px]">{task.domain}</CardTitle>
                </div>
                <Badge variant={task.status === 'running' ? 'default' : 'secondary'} className="text-[10px] uppercase">
                  {task.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Progress</span>
                    <span>{Math.floor((task.crawledUrls / task.totalUrls) * 100)}%</span>
                  </div>
                  <Progress value={(task.crawledUrls / task.totalUrls) * 100} className="h-1.5" />
                  <p className="text-[10px] text-muted-foreground">{task.crawledUrls} / {task.totalUrls} URLs discovered</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="size-3" />
                    {new Date(task.createdAt).toLocaleDateString()}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="size-8 p-0"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.status === 'running' ? <Pause className="size-4" /> : <Play className="size-4 text-green-600" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {tasks.length === 0 && (
            <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl">
              <p className="text-muted-foreground">No active projects found. Start a new one to see it here.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}