import type { Metadata } from "next";
import { ProfileView } from "./ProfileView";

export const metadata: Metadata = {
  title: "Natijalarim",
  description:
    "Mashq qilgan promptlaringiz va yo'nalishlar bo'yicha natijalaringiz.",
};

export default function ProfilePage() {
  return <ProfileView />;
}
