import type { Metadata } from "next";
import { ProfileView } from "./ProfileView";

export const metadata: Metadata = {
  title: "Mening progressim",
  description:
    "Bajargan promptlaringiz va kategoriyalar bo'yicha progressingiz.",
};

export default function ProfilePage() {
  return <ProfileView />;
}
