import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Admin() {
  const getCookies = await cookies();
  const role = getCookies.get("role")?.value;

  if (role !== "admin") {
    redirect("/");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Adminpanel</h1>
      <p>Endast för admins</p>
    </div>
  );
}
