import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "@/lib/better-auth";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronUpIcon, HomeIcon, User2Icon } from "lucide-react";
import { useEffect } from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: HomeIcon,
  },
];

export function AppSidebar() {
  const { isMobile, setOpenMobile, openMobile } = useSidebar();
  const session = useSession();
  useEffect(() => {
    if (!openMobile) document.querySelector("body")?.setAttribute("style", "");
  }, [openMobile]);
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Link key={item.title} to={item.url}>
                  {({ isActive }) => (
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive={isActive}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2Icon /> {session.data?.user.email}
                  <ChevronUpIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={() => {
                    if (isMobile) setOpenMobile(false);
                    signOut();
                  }}
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
