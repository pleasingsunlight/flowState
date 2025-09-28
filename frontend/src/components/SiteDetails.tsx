import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ArrowLeft,
  Droplets, 
  Thermometer,
  Wind,
  Calendar,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle,
  Activity,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface SiteDetailsProps {
  siteId: string;
  onBack: () => void;
}

export function SiteDetails({ siteId, onBack }: SiteDetailsProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Mock detailed site data
  const siteData = {
    id: siteId,
    name: siteId === '3' ? 'Sikar Road Wells' : siteId === '1' ? 'Aravalli Aquifer' : 'Water Site',
    location: '26.9520°N, 75.7150°E',
    status: siteId === '3' ? 'low' : 'good',
    currentLevel: siteId === '3' ? 45 : 85,
    capacity: 1200,
    lastUpdate: '30 minutes ago',
    alerts: siteId === '3' ? 2 : 0,
    sensors: {
      waterLevel: { value: siteId === '3' ? 45 : 85, unit: '%', trend: siteId === '3' ? 'down' : 'up' },
      temperature: { value: 18.5, unit: '°C', trend: 'stable' },
      ph: { value: 7.2, unit: 'pH', trend: 'stable' },
      turbidity: { value: 2.1, unit: 'NTU', trend: 'up' },
      flowRate: { value: 3.4, unit: 'L/s', trend: 'down' }
    }
  };

  // Mock historical data
  const historicalData = [
    { time: '00:00', level: 78, temperature: 17.2, flow: 3.8 },
    { time: '04:00', level: 76, temperature: 16.8, flow: 3.6 },
    { time: '08:00', level: 74, temperature: 17.5, flow: 3.4 },
    { time: '12:00', level: 72, temperature: 18.8, flow: 3.2 },
    { time: '16:00', level: 70, temperature: 19.2, flow: 3.1 },
    { time: '20:00', level: 68, temperature: 18.5, flow: 3.4 },
    { time: '24:00', level: siteData.currentLevel, temperature: 18.5, flow: 3.4 }
  ];

  const weeklyData = [
    { day: 'Mon', usage: 1200, target: 1000 },
    { day: 'Tue', usage: 1100, target: 1000 },
    { day: 'Wed', usage: 1300, target: 1000 },
    { day: 'Thu', usage: 1250, target: 1000 },
    { day: 'Fri', usage: 1400, target: 1000 },
    { day: 'Sat', usage: 900, target: 1000 },
    { day: 'Sun', usage: 800, target: 1000 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 space-y-4 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl text-blue-900">{siteData.name}</h1>
            <p className="text-sm text-gray-600">{siteData.location}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${siteData.status === 'low' ? 'bg-red-100' : 'bg-blue-100'}`}>
                <Droplets className={`w-6 h-6 ${getStatusColor(siteData.status)}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Water Level</p>
                <p className={`text-2xl font-medium ${getStatusColor(siteData.status)}`}>
                  {siteData.currentLevel}%
                </p>
                <p className="text-xs text-gray-500">Updated {siteData.lastUpdate}</p>
              </div>
            </div>
            
            <div className="text-right">
              {siteData.alerts > 0 ? (
                <Badge variant="destructive">
                  {siteData.alerts} Active Alert{siteData.alerts > 1 ? 's' : ''}
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Normal
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Sensors */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span>Real-time Sensors</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Temperature</span>
                </div>
                {getTrendIcon(siteData.sensors.temperature.trend)}
              </div>
              <p className="text-xl font-medium mt-1">
                {siteData.sensors.temperature.value}{siteData.sensors.temperature.unit}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Flow Rate</span>
                </div>
                {getTrendIcon(siteData.sensors.flowRate.trend)}
              </div>
              <p className="text-xl font-medium mt-1">
                {siteData.sensors.flowRate.value}{siteData.sensors.flowRate.unit}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="text-sm">pH Level</span>
                </div>
                {getTrendIcon(siteData.sensors.ph.trend)}
              </div>
              <p className="text-xl font-medium mt-1">
                {siteData.sensors.ph.value}{siteData.sensors.ph.unit}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                  <span className="text-sm">Turbidity</span>
                </div>
                {getTrendIcon(siteData.sensors.turbidity.trend)}
              </div>
              <p className="text-xl font-medium mt-1">
                {siteData.sensors.turbidity.value}{siteData.sensors.turbidity.unit}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Visualization Tabs */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Historical Data</CardTitle>
            <select 
              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 3 Months</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="levels" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="levels">Water Levels</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
            </TabsList>
            
            <TabsContent value="levels" className="mt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="level" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="usage" className="mt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#06b6d4" />
                    <Bar dataKey="target" fill="#e5e7eb" opacity={0.5} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="quality" className="mt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="flow" 
                      stroke="#10b981" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      {siteData.alerts > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <span>Active Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-800">Low Water Level</p>
                  <p className="text-sm text-red-600">Water level has dropped below 50% threshold</p>
                  <p className="text-xs text-red-500 mt-1">Detected 2 hours ago</p>
                </div>
                <Badge variant="destructive">High</Badge>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-yellow-800">Maintenance Required</p>
                  <p className="text-sm text-yellow-600">Sensor calibration needed</p>
                  <p className="text-xs text-yellow-500 mt-1">Detected 1 day ago</p>
                </div>
                <Badge variant="secondary">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Maintenance Log */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm">Data sync completed</p>
              <p className="text-xs text-gray-500">30 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm">Sensor calibration completed</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm">Low water level alert triggered</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}