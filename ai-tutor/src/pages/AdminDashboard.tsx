import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isAdmin: boolean;
  permissions: string[];
  createdAt: string;
}

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  userActivity: Array<{
    _id: string;
    count: number;
  }>;
  learningProgress: {
    averageCompletionRate: number;
    totalCompletedLessons: number;
    totalActiveUsers: number;
  };
  contentUsage: {
    totalMaterialsAccessed: number;
    mostAccessedMaterials: Array<{
      title: string;
      accessCount: number;
    }>;
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        if (activeTab === 'users') {
          const response = await api.get('/api/admin/users');
          setUsers(response.data);
        } else if (activeTab === 'analytics') {
          const response = await api.get('/api/admin/analytics');
          setAnalytics(response.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        const error = err as ApiError;
        setError(error.response?.data?.message || error.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setError('');
      setSuccessMessage('');
      
      const response = await api.patch(`/api/admin/users/${userId}/role`, { role: newRole });
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole, isAdmin: newRole !== 'user' } : user
      ));
      
      setSuccessMessage('User role updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating user role:', err);
      const error = err as ApiError;
      setError(error.response?.data?.message || 'Failed to update user role');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-indigo-100">Manage your application settings and users</p>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-6 font-medium ${
                  activeTab === 'users'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-6 font-medium ${
                  activeTab === 'analytics'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-6 font-medium ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">User Management</h2>
                {loading ? (
                  <div className="text-center py-8">Loading users...</div>
                ) : error ? (
                  <div className="text-red-500 text-center py-8">{error}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Permissions
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {user.permissions.join(', ')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading analytics data...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <div className="text-red-500 mb-2">{error}</div>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Try again
                    </button>
                  </div>
                ) : analytics ? (
                  <div className="space-y-6">
                    {/* User Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Total Users</h3>
                        <div className="text-3xl font-bold text-indigo-600">{analytics.totalUsers}</div>
                        <p className="text-gray-500">Registered users</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Active Users</h3>
                        <div className="text-3xl font-bold text-green-600">{analytics.activeUsers}</div>
                        <p className="text-gray-500">Active in last 7 days</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Learning Progress</h3>
                        <div className="text-3xl font-bold text-purple-600">
                          {analytics.learningProgress.averageCompletionRate}%
                        </div>
                        <p className="text-gray-500">Average completion rate</p>
                      </div>
                    </div>

                    {/* User Activity Chart */}
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-lg font-medium mb-4">User Activity (Last 7 Days)</h3>
                      <div className="h-64">
                        <div className="flex items-end h-48 space-x-2">
                          {analytics.userActivity.map((day) => (
                            <div key={day._id} className="flex-1">
                              <div
                                className="bg-indigo-500 rounded-t"
                                style={{
                                  height: `${(day.count / Math.max(...analytics.userActivity.map(d => d.count))) * 100}%`
                                }}
                              />
                              <div className="text-center text-xs text-gray-500 mt-2">
                                {new Date(day._id).toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content Usage */}
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-lg font-medium mb-4">Content Usage</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Total Materials Accessed</h4>
                          <div className="text-2xl font-bold text-indigo-600">
                            {analytics.contentUsage.totalMaterialsAccessed}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Most Accessed Materials</h4>
                          <ul className="space-y-2">
                            {analytics.contentUsage.mostAccessedMaterials.map((material, index) => (
                              <li key={index} className="flex justify-between">
                                <span className="text-gray-600">{material.title}</span>
                                <span className="font-medium">{material.accessCount} views</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Learning Progress Details */}
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-lg font-medium mb-4">Learning Progress Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Total Completed Lessons</h4>
                          <div className="text-2xl font-bold text-green-600">
                            {analytics.learningProgress.totalCompletedLessons}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Active Learners</h4>
                          <div className="text-2xl font-bold text-purple-600">
                            {analytics.learningProgress.totalActiveUsers}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No analytics data available
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">System Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Session Timeout
                        </label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Password Policy
                        </label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                          <option>Basic</option>
                          <option>Strong</option>
                          <option>Very Strong</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          Email Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          System Alerts
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 