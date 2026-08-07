export default function AppLayout({ map, sidebar, comparison }) {
  return (
    <main className="app-shell">
      <section className="workspace">
        <div className="workspace__map">{map}</div>
        <aside className="workspace__sidebar">{sidebar}</aside>
      </section>
      {comparison}
    </main>
  )
}
