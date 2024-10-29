import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  LayoutDashboard,
  Package,
  QrCode,
  ShoppingBag,
  BarChart3,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { name: 'QR Codes', href: '/dashboard/qr-codes', icon: QrCode },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        <div className="fixed inset-0 flex">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent
              user={user}
              location={location}
              logout={logout}
              mobile={true}
            />
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <SidebarContent user={user} location={location} logout={logout} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                {navigation.find((item) => item.href === location.pathname)?.name ||
                  'Dashboard'}
              </h1>
            </div>
          </div>
        </div>

        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ user, location, logout, mobile = false }) {
  return (
    <>
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <span className="text-xl font-bold text-gray-900">QR Order System</span>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const current = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  current
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <Icon
                  className={`${
                    current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 flex-shrink-0 h-6 w-6`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900">{user?.name}</div>
            <div className="text-xs text-gray-500">{user?.shopName}</div>
          </div>
          <button
            onClick={logout}
            className="ml-auto flex items-center text-sm text-red-500 hover:text-red-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}