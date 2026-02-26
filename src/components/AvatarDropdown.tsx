import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut, Zap, BookMarked, HelpCircle, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => navigate("/auth")}
        className="flex items-center gap-1.5 px-3.5 py-[7px] text-foreground border border-border rounded-lg text-[13px] font-medium hover:bg-muted/50 transition-all duration-150 active:scale-[0.97]"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Sign in</span>
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Open account menu"
          className="w-8 h-8 rounded-full bg-gradient-to-br from-sage to-sky flex items-center justify-center text-card text-xs font-bold ml-1 shadow-sm hover:shadow-md hover:ring-2 hover:ring-border transition-all duration-200"
        >
          {user?.avatar || "A"}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-xl">
        <DropdownMenuLabel className="px-4 py-3">
          <p className="text-[14px] font-semibold text-foreground">{user?.name || "User"}</p>
          <p className="text-[12px] text-muted-foreground">@{user?.username || "user"}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => navigate("/profile")} className="gap-3 px-4 py-2.5 text-[13px] font-medium">
          <User className="w-4 h-4 opacity-60" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile")} className="gap-3 px-4 py-2.5 text-[13px] font-medium">
          <Zap className="w-4 h-4 opacity-60" /> My Agents
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile")} className="gap-3 px-4 py-2.5 text-[13px] font-medium">
          <BookMarked className="w-4 h-4 opacity-60" /> Saved
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile")} className="gap-3 px-4 py-2.5 text-[13px] font-medium">
          <Settings className="w-4 h-4 opacity-60" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-3 px-4 py-2.5 text-[13px] font-medium">
          <HelpCircle className="w-4 h-4 opacity-60" /> Help & Support
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => { logout(); navigate("/"); }}
          className="gap-3 px-4 py-2.5 text-[13px] font-medium text-destructive focus:text-destructive"
        >
          <LogOut className="w-4 h-4 opacity-60" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
