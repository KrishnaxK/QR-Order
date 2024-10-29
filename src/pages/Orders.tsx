import React from 'react';
import { Clock, CheckCircle2, XCircle, Coffee } from 'lucide-react';
import type { Order, OrderStatus } from '../types/order';

const mockOrders: Order[] = [
  {
    id: '1',
    items: [
      { productId: '1', name: 'Classic Burger', quantity: 2, price: 8.99 },
      { productId: '2', name: 'Street Tacos', quantity: 1, price: 6.99 },
    ],
    status: 'pending',
    total: 24.97,
    customerName: 'Alice Johnson',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: '2',
    items: [
      { productId: '2', name: 'Street Tacos', quantity: 3, price: 6.99 },
    ],
    status: 'preparing',
    total: 20.97,
    customerName: 'Bob Smith',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
];

const statusColors: Record<OrderStatus, { bg: string; text: string; icon: any }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
  preparing: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Coffee },
  ready: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle2 },
  completed: { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircle2 },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
};

export function OrdersPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>

        <div className="mt-8 flex flex-col">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockOrders.map((order) => {
              const status = statusColors[order.status];
              const StatusIcon = status.icon;
              return (
                <div
                  key={order.id}
                  className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                >
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{order.id}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
                      >
                        <StatusIcon className="mr-1.5 h-4 w-4" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {order.customerName}
                    </p>
                  </div>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-gray-900">
                            ${(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-4 sm:px-6 bg-gray-50">
                    <div className="flex justify-between">
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        defaultValue={order.status}
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}