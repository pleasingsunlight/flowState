import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { WaterData, Alert, User } from '../App';
import { 
  Droplets, 
  Activity, 
  AlertTriangle, 
  TrendingUp,
  TrendingDown,
  Eye
} from 'lucide-react';

interface DashboardProps {
  waterData: WaterData[];
  alerts: Alert[];
  user: User;
}

export function Dashboard({ waterData, alerts, user }: DashboardProps) {
  const getAverageValue = (key: keyof Pick<WaterData, 'level' | 'ph' | 'tds' | 'hardness'>) => {
    if (waterData.length === 0) return 0;
    return waterData.reduce((sum, data) => sum + data[key], 0) / waterData.length;
  };

  const getStatusColor = (value: number, type: string) => {
    switch (type) {
      case 'level':
        if (value < 10) return 'text-red-600';
        if (value < 20) return 'text-yellow-600';
        return 'text-green-600';
      case 'ph':
        if (value < 6.5 || value > 8.5) return 'text-red-600';
        if (value < 7 || value > 8) return 'text-yellow-600';
        return 'text-green-600';
      case 'tds':
        if (value > 500) return 'text-red-600';
        if (value > 300) return 'text-yellow-600';
        return 'text-green-600';
      default:
        return 'text-foreground';
    }
  };

  const getStatusBadge = (value: number, type: string) => {
    switch (type) {
      case 'level':
        if (value < 10) return <Badge variant="destructive">Critical</Badge>;
        if (value < 20) return <Badge variant="secondary">Low</Badge>;
        return <Badge className="bg-green-100 text-green-800">Good</Badge>;
      case 'ph':
        if (value < 6.5 || value > 8.5) return <Badge variant="destructive">Unsafe</Badge>;
        if (value < 7 || value > 8) return <Badge variant="secondary">Moderate</Badge>;
        return <Badge className="bg-green-100 text-green-800">Safe</Badge>;
      case 'tds':
        if (value > 500) return <Badge variant="destructive">High</Badge>;
        if (value > 300) return <Badge variant="secondary">Moderate</Badge>;
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return null;
    }
  };

  const avgLevel = getAverageValue('level');
  const avgPH = getAverageValue('ph');
  const avgTDS = getAverageValue('tds');
  const avgHardness = getAverageValue('hardness');

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical').length;
  const warningAlerts = alerts.filter(alert => alert.type === 'warning').length;

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-lg">
        <h2>Good morning, {user.name}</h2>
        <p className="text-blue-100">Current water status in {user.location}</p>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{waterData.length} Monitoring Points</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Live Data</span>
          </div>
        </div>
      </div>

      {/* Alert Summary */}
      {(criticalAlerts > 0 || warningAlerts > 0) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {criticalAlerts > 0 && (
                <div className="flex-1 p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Critical</span>
                    <Badge variant="destructive">{criticalAlerts}</Badge>
                  </div>
                </div>
              )}
              {warningAlerts > 0 && (
                <div className="flex-1 p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Warning</span>
                    <Badge variant="secondary">{warningAlerts}</Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Water Level</span>
              </div>
              {getStatusBadge(avgLevel, 'level')}
            </div>
            <div className="space-y-2">
              <div className={`text-2xl font-medium ${getStatusColor(avgLevel, 'level')}`}>
                {avgLevel.toFixed(1)}m
              </div>
              <Progress value={(avgLevel / 50) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Average depth</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" />
                <span className="text-sm">pH Level</span>
              </div>
              {getStatusBadge(avgPH, 'ph')}
            </div>
            <div className="space-y-2">
              <div className={`text-2xl font-medium ${getStatusColor(avgPH, 'ph')}`}>
                {avgPH.toFixed(1)}
              </div>
              <Progress value={(avgPH - 6) / 3 * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Acidity level</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span className="text-sm">TDS</span>
              </div>
              {getStatusBadge(avgTDS, 'tds')}
            </div>
            <div className="space-y-2">
              <div className={`text-2xl font-medium ${getStatusColor(avgTDS, 'tds')}`}>
                {avgTDS.toFixed(0)} ppm
              </div>
              <Progress value={(avgTDS / 1000) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Dissolved solids</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-500" />
                <span className="text-sm">Hardness</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-medium">
                {avgHardness.toFixed(0)} mg/L
              </div>
              <Progress value={(avgHardness / 500) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Water hardness</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Data Points */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Readings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {waterData.slice(0, 3).map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{data.location.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(data.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${getStatusColor(data.level, 'level')}`}>
                      {data.level.toFixed(1)}m
                    </span>
                    {data.level < 15 ? (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    pH: {data.ph.toFixed(1)} | TDS: {data.tds.toFixed(0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}