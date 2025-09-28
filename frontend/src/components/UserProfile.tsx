import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Award, 
  Activity,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X
} from 'lucide-react';

interface UserProfileProps {
  userType: 'researcher' | 'policymaker' | 'general';
}

export function UserProfile({ userType }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    alerts: true
  });

  const [userInfo, setUserInfo] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    organization: 'Environmental Research Institute',
    location: 'San Francisco, CA',
    joinDate: 'March 2023'
  });

  const achievements = [
    { id: 1, title: 'Data Analyst', description: 'Analyzed 100+ water sites', icon: '📊', progress: 100 },
    { id: 2, title: 'Alert Responder', description: 'Responded to 50 alerts', icon: '🚨', progress: 85 },
    { id: 3, title: 'Conservation Hero', description: 'Saved 10,000L water', icon: '💧', progress: 67 },
    { id: 4, title: 'Research Pioneer', description: 'Published 5 reports', icon: '📖', progress: 40 }
  ];

  const activityStats = {
    sitesMonitored: userType === 'researcher' ? 45 : userType === 'policymaker' ? 120 : 12,
    alertsHandled: userType === 'researcher' ? 78 : userType === 'policymaker' ? 203 : 23,
    reportsGenerated: userType === 'researcher' ? 15 : userType === 'policymaker' ? 8 : 3,
    dataPoints: userType === 'researcher' ? 2847 : userType === 'policymaker' ? 1250 : 456
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (type: string) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const getUserTypeColor = () => {
    switch (userType) {
      case 'researcher': return 'bg-blue-100 text-blue-800';
      case 'policymaker': return 'bg-purple-100 text-purple-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'researcher': return 'Researcher';
      case 'policymaker': return 'Policy Maker';
      default: return 'General User';
    }
  };

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl text-blue-900 mb-2">Profile</h1>
        <p className="text-blue-700">Manage your account and preferences</p>
      </div>

      {/* Profile Info Card */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <span>Profile Information</span>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Profile Picture & Basic Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                {isEditing ? (
                  <Input
                    value={userInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="font-medium"
                  />
                ) : (
                  <h3 className="font-medium text-lg">{userInfo.name}</h3>
                )}
                <Badge className={getUserTypeColor()}>
                  {getUserTypeLabel()}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{userInfo.organization}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-500" />
              {isEditing ? (
                <Input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="flex-1"
                />
              ) : (
                <span className="text-sm">{userInfo.email}</span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-500" />
              {isEditing ? (
                <Input
                  value={userInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="flex-1"
                />
              ) : (
                <span className="text-sm">{userInfo.phone}</span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              {isEditing ? (
                <Input
                  value={userInfo.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="flex-1"
                />
              ) : (
                <span className="text-sm">{userInfo.location}</span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Member since {userInfo.joinDate}</span>
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-2 pt-2">
              <Button onClick={() => setIsEditing(false)} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span>Activity Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{activityStats.sitesMonitored}</p>
              <p className="text-sm text-gray-600">Sites Monitored</p>
            </div>
            
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{activityStats.alertsHandled}</p>
              <p className="text-sm text-gray-600">Alerts Handled</p>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{activityStats.reportsGenerated}</p>
              <p className="text-sm text-gray-600">Reports Generated</p>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{activityStats.dataPoints}</p>
              <p className="text-sm text-gray-600">Data Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-600" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <span className="text-sm text-gray-600">{achievement.progress}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                <Progress value={achievement.progress} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-orange-600" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <Switch 
              checked={notifications.email}
              onCheckedChange={() => handleNotificationToggle('email')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-600">Browser push notifications</p>
            </div>
            <Switch 
              checked={notifications.push}
              onCheckedChange={() => handleNotificationToggle('push')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Alerts</p>
              <p className="text-sm text-gray-600">Critical alerts via SMS</p>
            </div>
            <Switch 
              checked={notifications.sms}
              onCheckedChange={() => handleNotificationToggle('sms')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">System Alerts</p>
              <p className="text-sm text-gray-600">Water level and quality alerts</p>
            </div>
            <Switch 
              checked={notifications.alerts}
              onCheckedChange={() => handleNotificationToggle('alerts')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <span>Account Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Privacy & Security
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Bell className="w-4 h-4 mr-2" />
            Notification History
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Activity className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          
          <Button variant="destructive" className="w-full">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}