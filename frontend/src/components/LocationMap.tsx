import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  Navigation, 
  Filter,
  Droplets,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface LocationMapProps {
  onSiteSelect: (siteId: string) => void;
}

export function LocationMap({ onSiteSelect }: LocationMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockSites = [
    { 
      id: '1', 
      name: 'Aravalli Aquifer', 
      lat: 26.9124, 
      lng: 75.7873, 
      status: 'excellent', 
      level: 92,
      lastUpdate: '2 hours ago',
      alerts: 0
    },
    { 
      id: '2', 
      name: 'Sanganer Basin', 
      lat: 26.8467, 
      lng: 75.7794, 
      status: 'good', 
      level: 85,
      lastUpdate: '1 hour ago',
      alerts: 0
    },
    { 
      id: '3', 
      name: 'Sikar Road Wells', 
      lat: 26.9520, 
      lng: 75.7150, 
      status: 'low', 
      level: 45,
      lastUpdate: '30 min ago',
      alerts: 2
    },
    { 
      id: '4', 
      name: 'Mansarovar Reservoir', 
      lat: 26.8515, 
      lng: 75.8370, 
      status: 'fair', 
      level: 67,
      lastUpdate: '45 min ago',
      alerts: 1
    },
    { 
      id: '5', 
      name: 'Amber Fort Springs', 
      lat: 26.9855, 
      lng: 75.8513, 
      status: 'good', 
      level: 78,
      lastUpdate: '1.5 hours ago',
      alerts: 0
    },
    { 
      id: '6', 
      name: 'Kishangarh Wells', 
      lat: 26.5881, 
      lng: 74.8697, 
      status: 'fair', 
      level: 62,
      lastUpdate: '2 hours ago',
      alerts: 1
    },
    { 
      id: '7', 
      name: 'Tonk District Bore', 
      lat: 26.1612, 
      lng: 75.7849, 
      status: 'good', 
      level: 81,
      lastUpdate: '3 hours ago',
      alerts: 0
    }
  ];

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
      case 'fair': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'low': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredSites = selectedFilter === 'all' 
    ? mockSites 
    : mockSites.filter(site => site.status === selectedFilter);

  return (
    <div className="p-4 space-y-4 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-blue-900">Location Map</h1>
        <Badge variant="secondary">{filteredSites.length} sites</Badge>
      </div>

      {/* Map Controls */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.5))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select 
                className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Sites</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mock Map Area - Rajasthan/Jaipur Region */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <div 
            className="relative bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 rounded-lg overflow-hidden"
            style={{ 
              height: '300px',
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease'
            }}
          >
            {/* Aravalli Hills representation */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-20 h-32 bg-green-200 rounded-full opacity-40 transform rotate-12"></div>
              <div className="absolute top-8 left-8 w-16 h-24 bg-green-300 rounded-full opacity-30 transform rotate-12"></div>
            </div>
            
            {/* Grid pattern for map effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-orange-300"></div>
                ))}
              </div>
            </div>

            {/* Site Markers */}
            {filteredSites.map((site, index) => (
              <div
                key={site.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${15 + (index * 12)}%`,
                  top: `${25 + ((index % 4) * 15)}%`
                }}
                onClick={() => onSiteSelect(site.id)}
              >
                <div className="relative">
                  {/* Alert indicator */}
                  {site.alerts > 0 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center z-10">
                      <span className="text-xs text-white">{site.alerts}</span>
                    </div>
                  )}
                  
                  {/* Main marker */}
                  <div className={`w-6 h-6 rounded-full ${getStatusColor(site.status)} border-2 border-white shadow-lg flex items-center justify-center`}>
                    <Droplets className="w-3 h-3 text-white" />
                  </div>
                  
                  {/* Pulse animation for active sites */}
                  <div className={`absolute inset-0 w-6 h-6 rounded-full ${getStatusColor(site.status)} opacity-30 animate-ping`}></div>
                </div>
              </div>
            ))}

            {/* Legend overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
              <h4 className="font-medium mb-2">Status Legend</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Excellent (90%+)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Good (70-89%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Fair (50-69%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Low (&lt;50%)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Site List */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Monitoring Sites</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredSites.map((site) => (
            <div 
              key={site.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onSiteSelect(site.id)}
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(site.status)}
                <div>
                  <p className="font-medium text-gray-900">{site.name}</p>
                  <p className="text-sm text-gray-600">Updated {site.lastUpdate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {site.alerts > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {site.alerts} alert{site.alerts > 1 ? 's' : ''}
                  </Badge>
                )}
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
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}