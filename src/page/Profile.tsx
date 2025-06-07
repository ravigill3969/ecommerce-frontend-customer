import { useGetCurrentUser } from '@/api/user'
import React, { useState } from 'react'
import { User, Mail, Calendar, Package, Edit3, Lock, Save, X } from 'lucide-react'

function Profile() {
    const { data } = useGetCurrentUser()
    const [isEditingInfo, setIsEditingInfo] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    
    const [userInfo, setUserInfo] = useState({
        name: data?.user?.name || '',
        email: data?.user?.email || ''
    })
    
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleInfoSubmit = () => {
        // Handle user info update
        console.log('Updating user info:', userInfo)
        setIsEditingInfo(false)
    }

    const handlePasswordSubmit = () => {
        // Handle password update
        console.log('Updating password')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setIsEditingPassword(false)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (!data?.user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                    <p className="text-gray-600">Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Overview Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <div className="text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                                    {data.user.name.charAt(0).toUpperCase()}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{data.user.name}</h2>
                                <p className="text-gray-500 mb-6">{data.user.email}</p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Joined {formatDate(data.user.createdAt)}
                                    </div>
                                    <div className="flex items-center justify-center text-sm text-gray-600">
                                        <Package className="w-4 h-4 mr-2" />
                                        {data.user.prevOrders.length} Previous Orders
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-blue-600" />
                                        Personal Information
                                    </h3>
                                    {!isEditingInfo && (
                                        <button
                                            onClick={() => setIsEditingInfo(true)}
                                            className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Edit
                                        </button>
                                    )}
                                </div>

                                {!isEditingInfo ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                            <p className="text-gray-900 font-medium">{data.user.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                                            <p className="text-gray-900 font-medium">{data.user.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Last Updated</label>
                                            <p className="text-gray-900 font-medium">{formatDate(data.user.updatedAt)}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={userInfo.name}
                                                onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                value={userInfo.email}
                                                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div className="flex gap-3 pt-2">
                                            <button
                                                onClick={handleInfoSubmit}
                                                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsEditingInfo(false)
                                                    setUserInfo({
                                                        name: data.user.name,
                                                        email: data.user.email
                                                    })
                                                }}
                                                className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Password Update Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                                        <Lock className="w-5 h-5 mr-2 text-red-600" />
                                        Change Password
                                    </h3>
                                    {!isEditingPassword && (
                                        <button
                                            onClick={() => setIsEditingPassword(true)}
                                            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Update Password
                                        </button>
                                    )}
                                </div>

                                {!isEditingPassword ? (
                                    <div className="text-gray-600">
                                        <p>Keep your account secure by using a strong password.</p>
                                        <p className="text-sm mt-2">Last updated: {formatDate(data.user.updatedAt)}</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                            <input
                                                type="password"
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                            <input
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                            <input
                                                type="password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div className="flex gap-3 pt-2">
                                            <button
                                                onClick={handlePasswordSubmit}
                                                className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                            >
                                                <Save className="w-4 h-4 mr-2" />
                                                Update Password
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsEditingPassword(false)
                                                    setPasswordData({
                                                        currentPassword: '',
                                                        newPassword: '',
                                                        confirmPassword: ''
                                                    })
                                                }}
                                                className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile