import { createClient } from "@/utils/supabase/server";
import AuthButton from "./AuthButton";

const canInitSupabaseClient = () => {
  try {
    createClient();
    return true;
  } catch (e) {
    return false;
  }
};

const isSupabaseConnected = canInitSupabaseClient();
export default function Navbar() {
  return (
    <nav className="w-full flex justify-center  border-b border-b-foreground/10 h-16 ">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <p className="text-foreground/60">Logo</p>
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  );
}
