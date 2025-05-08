import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { UserSession } from '../lib/supabase';
import { Trash2, LogOut, Plus } from 'lucide-react';
import UploadForm from '../components/UploadForm';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  filters: string[];
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserSession['user']>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    
    getUserData();
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('kots')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setListings(data);
    }
  };

  const deleteListing = async (id: string) => {
    const { error } = await supabase
      .from('kots')
      .delete()
      .match({ id });

    if (!error) {
      setListings(listings.filter(listing => listing.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome{user?.email ? `, ${user.email.split('@')[0]}` : ''}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowUploadForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={18} />
              Upload Kot
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex gap-6 pb-4">
              {listings.length > 0 ? (
                listings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md w-[300px] flex-shrink-0 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={listing.images[0] || '/placeholder-image.jpg'}
                        alt={listing.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{listing.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{listing.description}</p>
                      <p className="text-blue-600 font-medium">€{listing.price}/month</p>
                      <p className="text-gray-500 text-sm mt-1">{listing.location}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-gray-500 italic">
                  No listings available yet
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {showUploadForm && (
        <UploadForm
          onClose={() => setShowUploadForm(false)}
          onSuccess={() => {
            setShowUploadForm(false);
            fetchListings();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;