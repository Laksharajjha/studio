import Link from "next/link";
import { Icons } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Icons.logo className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by your friends at Firebase.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Zelth. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
