import Separator from "@/components/Separator";
import { formatDateString } from "@/utils/formatUtils";
import { createClient } from "@/utils/supabase/server";

const Profile = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) return;
  return (
    <div className="">
      <h1>Minhas Informacoes</h1>
      <Separator />
      <div className="p-4 mt-8 bg-white rounded-lg shadow-md">
        <p className="text-gray-600 mb-4">Email: {user?.email}</p>
        <p className="text-gray-600 mb-4">Telefone: {user?.phone}</p>
        <p className="text-gray-600 mb-4">
          Ultimo login: {formatDateString(user?.last_sign_in_at || "")}
        </p>
      </div>
    </div>
  );
};
export default Profile;
