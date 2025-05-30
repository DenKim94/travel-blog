
async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function TravelBlogsPage() {
  await wait(1500); // Simulate a delay

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