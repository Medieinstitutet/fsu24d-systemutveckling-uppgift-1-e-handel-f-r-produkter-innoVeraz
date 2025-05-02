"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { LoginDialog } from "./login-dialog";

export function UserActions() {
  return (
    <div className="flex items-center gap-4 p-2 bg-[#eff0ef]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md cursor-pointer hover:ring-2 ring-muted"
            title="Användarmenyn"
          >
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="mt-2">
          <LoginDialog />
          <DropdownMenuItem onSelect={() => console.log("Inställningar")}>
            Inställningar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
