function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        
        {/* Sidebar */}
        <aside className="w-64 hidden md:block">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Communities</h2>

            <div className="space-y-3 text-zinc-300">
              <div>r/reactjs</div>
              <div>r/javascript</div>
              <div>r/webdev</div>
              <div>r/programming</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;