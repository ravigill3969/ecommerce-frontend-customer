import {
  useGetCurrentUser,
  useUpdateUserInfo,
  useUpdateUserPassword,
} from "@/api/user";
import { useState } from "react";
import { User, Calendar, Package, Lock, Check, X } from "lucide-react";
import EcommerceNavbar from "@/components/Nav2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Profile() {
  const { data } = useGetCurrentUser();
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: data?.user?.name || "",
    email: data?.user?.email || "",
    password: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { mutate } = useUpdateUserInfo();
  const { mutate: updatePasswordMutate } = useUpdateUserPassword();

  const handleInfoSubmit = () => {
    mutate({
      email: userInfo.email,
      name: userInfo.name,
      password: userInfo.password,
    });
    setIsEditingInfo(false);
  };

  const handlePasswordSubmit = () => {
    updatePasswordMutate({
      confirmNewPassword: passwordData.confirmPassword,
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditingPassword(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!data?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <EcommerceNavbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your account settings</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-2xl font-bold text-white">
                    {data.user.name.charAt(0).toUpperCase()}
                  </div>

                  <h2 className="mb-1 text-xl font-bold text-gray-900">
                    {data.user.name}
                  </h2>
                  <p className="mb-6 text-sm text-gray-500 break-all">
                    {data.user.email}
                  </p>

                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Joined</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(data.user.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package className="h-4 w-4" />
                        <span className="text-sm">Orders</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {data.user.prevOrders.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Personal Information */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Personal Information
                    </h3>
                  </div>
                  {!isEditingInfo && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingInfo(true)}
                    >
                      Edit
                    </Button>
                  )}
                </div>

                {!isEditingInfo ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-gray-500">Full Name</Label>
                      <p className="mt-1 font-medium text-gray-900">
                        {data.user.name}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">
                        Email Address
                      </Label>
                      <p className="mt-1 font-medium text-gray-900 break-all">
                        {data.user.email}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">
                        Last Updated
                      </Label>
                      <p className="mt-1 font-medium text-gray-900">
                        {formatDate(data.user.updatedAt)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, name: e.target.value })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, email: e.target.value })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={handleInfoSubmit}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditingInfo(false);
                          setUserInfo({
                            name: data.user.name,
                            email: data.user.email,
                            password: "",
                          });
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Security
                    </h3>
                  </div>
                  {!isEditingPassword && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingPassword(true)}
                    >
                      Change Password
                    </Button>
                  )}
                </div>

                {!isEditingPassword ? (
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">
                      Keep your account secure with a strong password.
                    </p>
                    <p className="text-xs text-gray-500">
                      Last updated: {formatDate(data.user.updatedAt)}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={handlePasswordSubmit}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditingPassword(false);
                          setPasswordData({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
