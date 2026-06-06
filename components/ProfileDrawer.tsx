'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, ArrowRightOnRectangleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: string;
}

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function ProfileDrawer({ isOpen, onClose, onLogout }: ProfileDrawerProps) {
  // State for real Supabase data
  const [userData, setUserData] = useState({ name: '', email: '', joined: '' });
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the data every time the drawer opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchProfileData = async () => {
      setIsLoading(true);
      
      // 1. Get the securely logged-in user's profile details
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Format the date they signed up (e.g., "June 2026")
        const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric'
        });

        setUserData({
          name: user.user_metadata?.full_name || 'Shopper', // Pulls name from registration
          email: user.email || '',
          joined: joinedDate
        });

        // 2. Fetch their actual orders from the database
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (ordersData) {
          const formattedOrders = ordersData.map((o) => ({
            id: `#BL-${o.id.toString().padStart(4, '0')}`, // Formats ID to look like #BL-0001
            date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            status: o.status,
            total: o.total_price,
            items: "Order details will appear here" // Placeholder until we build the cart-to-database link
          }));
          setPastOrders(formattedOrders);
        }
      }
      setIsLoading(false);
    };

    fetchProfileData();
  }, [isOpen]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-[85%] md:w-[450px] bg-[#FFF5F5] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-5 border-b border-[#F5E1E1] flex justify-between items-center bg-white">
          <h2 className="text-xl font-semibold tracking-wide text-[#5A2B2B]">My Account</h2>
          <button onClick={onClose} className="p-2 -mr-2 hover:bg-[#FFF5F5] rounded-full transition-colors">
            <XMarkIcon className="w-6 h-6 text-[#5A2B2B]" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          
          {/* USER INFO SECTION */}
          <section className="bg-white p-5 rounded-sm shadow-sm border border-[#F5E1E1]">
            {isLoading ? (
              <div className="animate-pulse flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-[#E5C3C8] rounded-full flex items-center justify-center text-[#5A2B2B] font-bold text-xl uppercase">
                    {userData.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#5A2B2B] capitalize">{userData.name}</h3>
                    <p className="text-sm text-[#7A4B4B]">{userData.email}</p>
                  </div>
                </div>
                <p className="text-xs text-[#A67C89]">Member since {userData.joined}</p>
              </>
            )}
          </section>

          {/* ORDER HISTORY SECTION */}
          <section>
            <h3 className="font-semibold text-lg text-[#5A2B2B] mb-4 flex items-center">
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              Order History
            </h3>
            
            <div className="space-y-4">
              {isLoading ? (
                <div className="animate-pulse bg-white p-4 h-24 rounded-sm border border-gray-100" />
              ) : pastOrders.length === 0 ? (
                <div className="bg-white p-6 rounded-sm border border-[#F5E1E1] text-center text-gray-500 text-sm">
                  <p>You haven't placed any orders yet.</p>
                </div>
              ) : (
                pastOrders.map((order) => (
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
                ))
              )}
            </div>
          </section>

        </div>

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