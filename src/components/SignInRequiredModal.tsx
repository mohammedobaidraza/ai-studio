import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LogIn } from "lucide-react";

interface SignInRequiredModalProps {
  open: boolean;
  onClose: () => void;
  action?: string;
}

const SignInRequiredModal = ({ open, onClose, action = "do that" }: SignInRequiredModalProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[380px] rounded-2xl p-8 text-center">
        <DialogHeader className="items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <LogIn className="w-5 h-5 text-foreground" />
          </div>
          <DialogTitle className="text-[18px]">Sign in required</DialogTitle>
          <DialogDescription className="text-[14px]">
            You need to sign in to {action}. It only takes a moment.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2.5 mt-4">
          <button
            onClick={() => { onClose(); navigate("/auth"); }}
            className="w-full py-3 bg-foreground text-card rounded-xl text-[14px] font-semibold hover:opacity-90 transition-all active:scale-[0.98]"
          >
            Sign in
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-muted-foreground text-[14px] font-medium hover:text-foreground transition-colors"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInRequiredModal;
