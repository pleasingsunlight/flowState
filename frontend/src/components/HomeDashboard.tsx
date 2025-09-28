import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Droplets, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Users, 
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

interface HomeDashboardProps {
  userType: 'researcher' | 'policymaker' | 'general';
}

export function HomeDashboard({ userType }: HomeDashboardProps) {
  const mockData = {
    totalSites: 24,
    activeSites: 21,
    alerts: 3,
    avgWaterLevel: 78,
    weeklyUsage: 1247,
    monthlyBudget: 2000,
    recentAlerts: [
      { id: 1, site: 'Sikar Road Wells', type: 'low_level', severity: 'high' },
      { id: 2, site: 'Mansarovar Reservoir', type: 'quality', severity: 'medium' },
      { id: 3, site: 'Amber Fort Springs', type: 'maintenance', severity: 'low' }
    ],
    topSites: [
      { name: 'Aravalli Aquifer', level: 92, status: 'excellent' },
      { name: 'Sanganer Basin', level: 85, status: 'good' },
      { name: 'Sikar Road Wells', level: 45, status: 'low' },
      { name: 'Mansarovar Reservoir', level: 67, status: 'fair' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'good': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'fair': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'low': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl text-blue-900 mb-2">Welcome to FlowState</h1>
        <p className="text-blue-700">
          {userType === 'researcher' ? 'Research Dashboard' : 
           userType === 'policymaker' ? 'Policy Dashboard' : 
           'Water Management Overview'}
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Sites</p>
                <p className="text-xl text-blue-900">{mockData.activeSites}/{mockData.totalSites}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-xl text-red-600">{mockData.alerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Droplets className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Level</p>
                <p className="text-xl text-green-600">{mockData.avgWaterLevel}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Weekly Usage</p>
                <p className="text-xl text-purple-600">{mockData.weeklyUsage}L</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Progress */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Monthly Usage Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Used: {mockData.weeklyUsage * 4}L</span>
              <span>Budget: {mockData.monthlyBudget}L</span>
            </div>
            <Progress 
              value={(mockData.weeklyUsage * 4 / mockData.monthlyBudget) * 100} 
              className="h-3"
            />
            <p className="text-xs text-gray-600 text-center">
              {Math.round(((mockData.monthlyBudget - mockData.weeklyUsage * 4) / mockData.monthlyBudget) * 100)}% remaining
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Recent Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockData.recentAlerts.map((alert) => (
            <Alert key={alert.id} className="border-l-4 border-l-orange-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{alert.site}</span>
                  <p className="text-sm text-gray-600 capitalize">
                    {alert.type.replace('_', ' ')} issue detected
                  </p>
                </div>
                <Badge variant={getSeverityColor(alert.severity)}>
                  {alert.severity}
                </Badge>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Top Sites Performance */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-green-600" />
            <span>Site Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockData.topSites.map((site, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(site.status)}
                <div>
                  <p className="font-medium text-gray-900">{site.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{site.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{site.level}%</p>
                <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className={`h-full rounded-full ${getStatusColor(site.status)}`}
                    style={{ width: `${site.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Role-specific insights */}
      {userType === 'researcher' && (
        <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-700">Research Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Data Points Collected</span>
                <Badge variant="secondary">2,847</Badge>
              </div>
              <div className="flex justify-between">
                <span>Analysis Reports</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between">
                <span>Correlation Score</span>
                <Badge variant="default">0.85</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {userType === 'policymaker' && (
        <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-700">Policy Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Consider implementing water conservation measures in Sikar Road region.
                </AlertDescription>
              </Alert>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Budget allocation needed for Mansarovar Reservoir infrastructure upgrade.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}