import AdminSidebar from "../sidebar/AdminSidebar";

function Dashboard({ children }: Readonly < { children: React.ReactNode } > ) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">
            This is a dark sidebar example with submenus.
          </p>
        </div> */}
        {children}
      </main>
    </div>
  );
}

export default Dashboard;
