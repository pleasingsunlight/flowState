import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { WaterData } from '../App';
import { MapPin, Droplets, Activity, TrendingUp, Filter } from 'lucide-react';

interface MapViewProps {
  waterData: WaterData[];
}

export function MapView({ waterData }: MapViewProps) {
  const [selectedLocation, setSelectedLocation] = useState<WaterData | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'warning' | 'good'>('all');

  const getLocationStatus = (data: WaterData) => {
    if (data.level < 10 || data.ph < 6.5 || data.ph > 8.5 || data.tds > 500) {
      return 'critical';
    } else if (data.level < 20 || data.ph < 7 || data.ph > 8 || data.tds > 300) {
      return 'warning';
    }
    return 'good';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'good':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge variant="secondary">Warning</Badge>;
      case 'good':
        return <Badge className="bg-green-100 text-green-800">Good</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const filteredData = waterData.filter(data => {
    if (filterType === 'all') return true;
    return getLocationStatus(data) === filterType;
  });

  const statusCounts = {
    critical: waterData.filter(d => getLocationStatus(d) === 'critical').length,
    warning: waterData.filter(d => getLocationStatus(d) === 'warning').length,
    good: waterData.filter(d => getLocationStatus(d) === 'good').length
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2>Regional Water Map</h2>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant={filterType === 'critical' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterType(filterType === 'critical' ? 'all' : 'critical')}
          className="flex flex-col h-auto py-3"
        >
          <div className="w-3 h-3 bg-red-500 rounded-full mb-1"></div>
          <div className="text-lg font-medium">{statusCounts.critical}</div>
          <div className="text-xs">Critical</div>
        </Button>
        <Button
          variant={filterType === 'warning' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterType(filterType === 'warning' ? 'all' : 'warning')}
          className="flex flex-col h-auto py-3"
        >
          <div className="w-3 h-3 bg-yellow-500 rounded-full mb-1"></div>
          <div className="text-lg font-medium">{statusCounts.warning}</div>
          <div className="text-xs">Warning</div>
        </Button>
        <Button
          variant={filterType === 'good' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterType(filterType === 'good' ? 'all' : 'good')}
          className="flex flex-col h-auto py-3"
        >
          <div className="w-3 h-3 bg-green-500 rounded-full mb-1"></div>
          <div className="text-lg font-medium">{statusCounts.good}</div>
          <div className="text-xs">Good</div>
        </Button>
      </div>

      {/* Simplified Map View */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoring Locations</CardTitle>
          <p className="text-sm text-muted-foreground">
            Tap on a location to view details
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 min-h-[300px]">
            {/* Mock map visualization */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 300 200">
                <path d="M50,50 Q150,30 250,60 Q200,100 150,120 Q100,100 50,80 Z" fill="currentColor" />
                <path d="M30,120 Q100,140 200,130 Q250,150 280,170" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            
            {filteredData.map((data, index) => {
              const status = getLocationStatus(data);
              // Position points based on mock coordinates
              const x = ((data.location.lng - 77) * 200) + 100;
              const y = (-(data.location.lat - 28.6) * 150) + 100;
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedLocation(data)}
                  className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110 ${getStatusColor(status)}`}
                  style={{
                    left: Math.max(10, Math.min(x, 260)),
                    top: Math.max(10, Math.min(y, 170))
                  }}
                >
                  <MapPin className="w-4 h-4 text-white m-auto" />
                </button>
              );
            })}
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-sm">
              <div className="text-xs font-medium mb-2">Status</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs">Critical</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      {selectedLocation && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {selectedLocation.location.name}
              </CardTitle>
              {getStatusBadge(getLocationStatus(selectedLocation))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Water Level</span>
                </div>
                <div className="text-xl font-medium">
                  {selectedLocation.level.toFixed(1)}m
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm">pH Level</span>
                </div>
                <div className="text-xl font-medium">
                  {selectedLocation.ph.toFixed(1)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">TDS</span>
                </div>
                <div className="text-xl font-medium">
                  {selectedLocation.tds.toFixed(0)} ppm
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Hardness</span>
                </div>
                <div className="text-xl font-medium">
                  {selectedLocation.hardness.toFixed(0)} mg/L
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t">
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(selectedLocation.timestamp).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Location List */}
      <Card>
        <CardHeader>
          <CardTitle>All Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredData.map((data, index) => {
              const status = getLocationStatus(data);
              return (
                <button
                  key={index}
                  onClick={() => setSelectedLocation(data)}
                  className="w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                      <div>
                        <p className="font-medium">{data.location.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Level: {data.level.toFixed(1)}m • pH: {data.ph.toFixed(1)}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(status)}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}