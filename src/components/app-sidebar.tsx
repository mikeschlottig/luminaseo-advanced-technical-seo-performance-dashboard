import React from "react";
import { Globe, Search, List, Settings, LayoutDashboard, Database, Activity } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
  SidebarInput,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const menuItems = [
    { title: "Page Crawler", icon: Globe, path: "/" },
    { title: "Domain Crawler", icon: Database, path: "/domain-crawler" },
    { title: "Task Manager", icon: List, path: "/tasks" },
    { title: "Activity", icon: Activity, path: "/activity" },
  ];
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
            L
          </div>
          <span className="text-sm font-semibold truncate">LuminaSEO</span>
        </div>
        <SidebarInput placeholder="Search project..." className="mx-1" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Analysis</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild isActive={location.pathname === item.path} tooltip={item.title}>
                  <Link to={item.path}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Configuration</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link to="/settings">
                  <Settings className="size-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-4 text-xs text-muted-foreground">
          v1.0.4-stable
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}