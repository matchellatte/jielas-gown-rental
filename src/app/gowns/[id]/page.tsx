import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getGownsFromSheet } from "@/lib/sheets";
import { GownDetailClient } from "../../../components/GownDetailClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GownDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const gowns = await getGownsFromSheet();
  const gown = gowns.find((g) => g.id === resolvedParams.id);

  if (!gown) {
    notFound();
  }

  const facebookMessengerLink = "https://m.me/JielaGownForRentOrmoc";

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <GownDetailClient gown={gown} facebookMessengerLink={facebookMessengerLink} />
      </main>
    </div>
  );
}
