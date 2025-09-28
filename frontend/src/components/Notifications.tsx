import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  Archive
} from 'lucide-react';

export function Notifications() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Low Water Level Alert',
      message: 'North Valley site has dropped below critical threshold (45%)',
      timestamp: '2 hours ago',
      severity: 'high',
      read: false,
      site: 'North Valley'
    },
    {
      id: 2,
      type: 'quality',
      title: 'Water Quality Issue',
      message: 'pH levels detected outside normal range at East Basin',
      timestamp: '4 hours ago',
      severity: 'medium',
      read: false,
      site: 'East Basin'
    },
    {
      id: 3,
      type: 'maintenance',
      title: 'Scheduled Maintenance',
      message: 'Sensor calibration completed at Central Aquifer',
      timestamp: '6 hours ago',
      severity: 'low',
      read: true,
      site: 'Central Aquifer'
    },
    {
      id: 4,
      type: 'system',
      title: 'Data Sync Complete',
      message: 'All monitoring sites synchronized successfully',
      timestamp: '8 hours ago',
      severity: 'info',
      read: true,
      site: 'System'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Flow Rate Anomaly',
      message: 'Unusual flow pattern detected at West Ridge monitoring station',
      timestamp: '12 hours ago',
      severity: 'medium',
      read: true,
      site: 'West Ridge'
    },
    {
      id: 6,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You have successfully monitored 100 water sites!',
      timestamp: '1 day ago',
      severity: 'success',
      read: false,
      site: 'Profile'
    },
    {
      id: 7,
      type: 'report',
      title: 'Weekly Report Available',
      message: 'Your weekly water management report is ready for review',
      timestamp: '2 days ago',
      severity: 'info',
      read: true,
      site: 'Reports'
    },
    {
      id: 8,
      type: 'maintenance',
      title: 'Maintenance Required',
      message: 'South Creek monitoring equipment needs attention',
      timestamp: '3 days ago',
      severity: 'medium',
      read: true,
      site: 'South Creek'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'quality': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'maintenance': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'system': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'achievement': return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'report': return <Bell className="w-5 h-5 text-cyan-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      case 'success': return 'secondary';
      case 'info': return 'secondary';
      default: return 'default';
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-blue-50 border-blue-200';
      case 'success': return 'bg-green-50 border-green-200';
      case 'info': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notification.read;
    if (selectedFilter === 'alerts') return notification.type === 'alert' || notification.type === 'quality';
    return notification.type === selectedFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="p-4 space-y-4 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-blue-900">Notifications</h1>
          <p className="text-blue-700">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filter Bar */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select 
                className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="alerts">Alerts</option>
                <option value="maintenance">Maintenance</option>
                <option value="system">System</option>
                <option value="report">Reports</option>
              </select>
            </div>
            <Badge variant="secondary">
              {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No notifications found</p>
              <p className="text-sm text-gray-500 mt-1">
                {selectedFilter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "Try adjusting your filter to see more notifications."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`bg-white/80 backdrop-blur-sm transition-all duration-200 ${
                !notification.read ? 'ring-2 ring-blue-200 ' + getSeverityBgColor(notification.severity) : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-600'} mb-2`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                          <Badge variant={getSeverityColor(notification.severity)} className="text-xs">
                            {notification.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {notification.site}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Action buttons for specific notification types */}
                    {(notification.type === 'alert' || notification.type === 'quality') && (
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          View Site Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Create Report
                        </Button>
                      </div>
                    )}

                    {notification.type === 'report' && (
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          View Report
                        </Button>
                        <Button size="sm" variant="outline">
                          Download PDF
                        </Button>
                      </div>
                    )}

                    {notification.type === 'maintenance' && (
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          Schedule Service
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Archive className="w-4 h-4 mr-2" />
            Archive All Read
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Bell className="w-4 h-4 mr-2" />
            Notification Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}