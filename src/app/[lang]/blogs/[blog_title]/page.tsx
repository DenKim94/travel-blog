import * as appConstants from "@utils/appConstants";

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function TravelBlogsPage({ params }: 
  Readonly<{params: Promise<{lang: appConstants.SupportedLanguageType, blog_title: string}>
}>) {
  await wait(1500); // Simulate a delay

  const { lang, blog_title} = await params;
  // Daten fetchen 
  console.log("currentLang: ", lang)
  console.log("blog_title: ", blog_title)

  return (
    <div className="travel-blogs-page">
    {/* To-Do: Erstellen und Einfügen einzelner Abschnitte */}
      <section>
        {/* Landingpage-Inhalt */}
        <h1>Meine Reiseblogs</h1>
      </section>
    </div>
  );
}