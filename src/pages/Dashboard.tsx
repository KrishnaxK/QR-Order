import React from 'react';
import { useAuthStore } from '../store/authStore';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  DollarSign,
} from 'lucide-react';

const stats = [
  { name: 'Total Orders', icon: ShoppingBag, value: '24', change: '+4.75%' },
  { name: 'Products', icon: Package, value: '12', change: '+1 today' },
  { name: 'Revenue', icon: DollarSign, value: '$542.00', change: '+15.2%' },
  { name: 'Growth', icon: TrendingUp, value: '23.5%', change: '+2.3%' },
];

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.name}
                  className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                >
                  <dt>
                    <div className="absolute bg-indigo-500 rounded-md p-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </p>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      {stat.change}
                    </p>
                  </dd>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}