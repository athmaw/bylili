'use client';

import { XMarkIcon, ArrowRightOnRectangleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  total: number;
  items: string;
}

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function ProfileDrawer({ isOpen, onClose, onLogout }: ProfileDrawerProps) {
  // Mock User Data
  const user = {
    name: "Alex",
    email: "alex@example.com",
    joined: "May 2026"
  };

  // Mock Order History Data
  const pastOrders: Order[] = [
    {
      id: "#BL-8492",
      date: "May 14, 2026",
      status: "Processing",
      total: 1800,
      items: "Emma Top (Pink, S), Lorraine Top (White, S)"
    },
    {
      id: "#BL-7104",
      date: "April 22, 2026",
      status: "Delivered",
      total: 900,
      items: "Shasha Top (Stripe, M)"
    }
  ];

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] md:w-[450px] bg-[#FFF5F5] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#F5E1E1] flex justify-between items-center bg-white">
          <h2 className="text-xl font-semibold tracking-wide text-[#5A2B2B]">My Account</h2>
          <button onClick={onClose} className="p-2 -mr-2 hover:bg-[#FFF5F5] rounded-full transition-colors">
            <XMarkIcon className="w-6 h-6 text-[#5A2B2B]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          
          {/* User Info Section */}
          <section className="bg-white p-5 rounded-sm shadow-sm border border-[#F5E1E1]">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-[#E5C3C8] rounded-full flex items-center justify-center text-[#5A2B2B] font-bold text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#5A2B2B]">{user.name}</h3>
                <p className="text-sm text-[#7A4B4B]">{user.email}</p>
              </div>
            </div>
            <p className="text-xs text-[#A67C89]">Member since {user.joined}</p>
          </section>

          {/* Order History Section */}
          <section>
            <h3 className="font-semibold text-lg text-[#5A2B2B] mb-4 flex items-center">
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              Order History
            </h3>
            
            <div className="space-y-4">
              {pastOrders.map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-sm shadow-sm border border-[#F5E1E1] flex flex-col space-y-2">
                  <div className="flex justify-between items-start border-b border-gray-100 pb-2">
                    <div>
                      <p className="font-semibold text-sm">{order.id}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-sm ${
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{order.items}</p>
                  <p className="text-sm font-semibold text-right">₱{order.total}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Footer (Logout Button) */}
        <div className="p-6 border-t border-[#F5E1E1] bg-white">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-[#E5C3C8] text-[#5A2B2B] py-3 text-sm font-bold tracking-widest hover:bg-[#FFF5F5] transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>LOG OUT</span>
          </button>
        </div>
      </div>
    </>
  );
}