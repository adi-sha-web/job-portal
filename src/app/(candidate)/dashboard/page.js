import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Welcome {session.user.name}
      </h1>

      <p>{session.user.email}</p>

      <p>Role: {session.user.role}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton />
    </div>
  );
}