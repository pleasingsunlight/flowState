import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Droplets, Eye, EyeOff } from 'lucide-react';
import logoImage from 'figma:asset/3d49b283580c43f838389085304623acf7df4c72.png';

interface AuthScreensProps {
  onLogin: (userType: 'researcher' | 'policymaker' | 'general') => void;
}

export function AuthScreens({ onLogin }: AuthScreensProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    organization: '',
    userType: 'general' as 'researcher' | 'policymaker' | 'general'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    onLogin(formData.userType);
  };

  const handleSignup = () => {
    onLogin(formData.userType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* App Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <img 
              src={logoImage} 
              alt="FlowState Logo" 
              className="w-16 h-16 rounded-full"
            />
          </div>
          <h1 className="text-3xl text-blue-900 mb-2">FlowState</h1>
          <p className="text-blue-600">Groundwater Resource Management</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-center text-blue-900">Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700">User Type</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    value={formData.userType}
                    onChange={(e) => handleInputChange('userType', e.target.value)}
                  >
                    <option value="general">General User</option>
                    <option value="researcher">Researcher</option>
                    <option value="policymaker">Policymaker</option>
                  </select>
                </div>

                <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Full Name</label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Organization</label>
                  <Input
                    placeholder="Enter your organization"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700">User Type</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    value={formData.userType}
                    onChange={(e) => handleInputChange('userType', e.target.value)}
                  >
                    <option value="general">General User</option>
                    <option value="researcher">Researcher</option>
                    <option value="policymaker">Policymaker</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                </div>

                <Button onClick={handleSignup} className="w-full bg-blue-600 hover:bg-blue-700">
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}