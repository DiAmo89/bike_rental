export default function UserProfile() {
    return (
      <div className="max-w-5xl mx-auto px-6 pt-20">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
  
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
          <div className="flex items-start justify-between">
            
            {/* Avatar + Name */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
                JD
              </div>
  
              <div>
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-gray-500">Member since Dec 2024</p>
              </div>
            </div>
  
            {/* Edit button */}
            <button className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
              Edit Profile
            </button>
          </div>
  
          {/* Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">john.doe@email.com</p>
            </div>
  
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">+49 151 12345678</p>
            </div>
  
          </div>
        </div>
      </div>
    );
  }