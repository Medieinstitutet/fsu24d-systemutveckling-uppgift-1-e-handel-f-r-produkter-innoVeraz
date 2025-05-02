"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function LoginDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="w-full text-left px-3 py-2 hover:bg-muted rounded-sm"
        >
          Logga in
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Logga in</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <Input type="text" placeholder="Användarnamn eller e-post" />
          <Input type="password" placeholder="Lösenord" />
          <DialogFooter>
            <Button type="submit" className="w-full">
              Logga in
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
