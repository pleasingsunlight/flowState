import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { WaterData, Alert, User } from '../App';
import { 
  Sprout, 
  Droplets, 
  CloudRain, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Sun,
  Cloud
} from 'lucide-react';

interface FarmerDashboardProps {
  waterData: WaterData[];
  alerts: Alert[];
  user: User;
}

export function FarmerDashboard({ waterData, alerts, user }: FarmerDashboardProps) {
  const [selectedCrop, setSelectedCrop] = useState<'wheat' | 'rice' | 'vegetables'>('wheat');

  // Mock soil and weather data
  const soilData = {
    moisture: 65,
    ph: 6.8,
    nitrogen: 180,
    phosphorus: 45,
    potassium: 220,
    organic: 2.8
  };

  const weatherForecast = [
    { day: 'Today', temp: 28, condition: 'sunny', rain: 0 },
    { day: 'Tomorrow', temp: 26, condition: 'cloudy', rain: 5 },
    { day: 'Wed', temp: 24, condition: 'rainy', rain: 15 },
    { day: 'Thu', temp: 25, condition: 'cloudy', rain: 8 },
    { day: 'Fri', temp: 27, condition: 'sunny', rain: 0 },
    { day: 'Sat', temp: 29, condition: 'sunny', rain: 0 },
    { day: 'Sun', temp: 31, condition: 'sunny', rain: 2 }
  ];

  const getAverageWaterLevel = () => {
    if (waterData.length === 0) return 0;
    return waterData.reduce((sum, data) => sum + data.level, 0) / waterData.length;
  };

  const getAverageWaterQuality = () => {
    if (waterData.length === 0) return { ph: 7, tds: 300 };
    return {
      ph: waterData.reduce((sum, data) => sum + data.ph, 0) / waterData.length,
      tds: waterData.reduce((sum, data) => sum + data.tds, 0) / waterData.length
    };
  };

  const getCropRecommendations = (crop: string) => {
    const avgLevel = getAverageWaterLevel();
    const waterQuality = getAverageWaterQuality();
    
    switch (crop) {
      case 'wheat':
        return {
          suitability: avgLevel > 15 && waterQuality.ph > 6.5 && waterQuality.ph < 8 ? 'excellent' : 'good',
          waterRequirement: '450-650mm per season',
          optimalPH: '6.0-7.5',
          irrigationSchedule: avgLevel > 20 ? 'Every 10-12 days' : 'Every 7-8 days',
          nextIrrigation: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          tips: [
            'Current groundwater level is suitable for wheat cultivation',
            'Consider drip irrigation to optimize water usage',
            'Monitor soil moisture regularly during grain filling stage'
          ]
        };
      case 'rice':
        return {
          suitability: avgLevel > 25 ? 'excellent' : avgLevel > 15 ? 'good' : 'challenging',
          waterRequirement: '1200-1500mm per season',
          optimalPH: '6.0-7.0',
          irrigationSchedule: 'Continuous flooding required',
          nextIrrigation: 'Maintain water level',
          tips: [
            avgLevel > 25 ? 'Excellent water availability for rice farming' : 'Consider alternate wetting and drying',
            'Current pH level is suitable for rice cultivation',
            'Monitor water level closely during reproductive stage'
          ]
        };
      case 'vegetables':
        return {
          suitability: avgLevel > 10 && waterQuality.tds < 600 ? 'excellent' : 'good',
          waterRequirement: '300-500mm per season',
          optimalPH: '6.0-7.0',
          irrigationSchedule: avgLevel > 15 ? 'Every 2-3 days' : 'Daily light irrigation',
          nextIrrigation: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          tips: [
            'Drip irrigation recommended for vegetables',
            'Current water quality is suitable for vegetable cultivation',
            'Mulching can help retain soil moisture'
          ]
        };
      default:
        return {
          suitability: 'good',
          waterRequirement: 'Variable',
          optimalPH: '6.0-7.5',
          irrigationSchedule: 'As needed',
          nextIrrigation: 'Monitor soil moisture',
          tips: ['Select crop based on local conditions']
        };
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'challenging':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-4 h-4 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-4 h-4 text-blue-500" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  const weeklyRainfall = weatherForecast.reduce((sum, day) => sum + day.rain, 0);
  const avgLevel = getAverageWaterLevel();
  const waterQuality = getAverageWaterQuality();
  const cropInfo = getCropRecommendations(selectedCrop);

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <Sprout className="w-6 h-6" />
          <h2>Farm Dashboard</h2>
        </div>
        <p className="text-green-100">Welcome back, {user.name}!</p>
        <p className="text-green-100 text-sm">Current conditions in {user.location}</p>
      </div>

      {/* Quick Status */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Water Level</span>
            </div>
            <div className="text-xl font-medium">
              {avgLevel.toFixed(1)}m
            </div>
            <Badge className={avgLevel > 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
              {avgLevel > 20 ? 'Adequate' : 'Monitor'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CloudRain className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Weekly Rain</span>
            </div>
            <div className="text-xl font-medium">
              {weeklyRainfall}mm
            </div>
            <Badge className={weeklyRainfall > 10 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
              {weeklyRainfall > 10 ? 'Good' : 'Low'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Crop Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Crop Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            {(['wheat', 'rice', 'vegetables'] as const).map((crop) => (
              <Button
                key={crop}
                variant={selectedCrop === crop ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCrop(crop)}
                className="capitalize"
              >
                {crop}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium capitalize">{selectedCrop} Cultivation</span>
              <Badge className={getSuitabilityColor(cropInfo.suitability)}>
                {cropInfo.suitability}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Water Requirement</p>
                <p className="font-medium">{cropInfo.waterRequirement}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Optimal pH</p>
                <p className="font-medium">{cropInfo.optimalPH}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Irrigation Schedule</p>
                <p className="font-medium">{cropInfo.irrigationSchedule}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Next Irrigation</p>
                <p className="font-medium">{cropInfo.nextIrrigation}</p>
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="font-medium mb-2">Tips & Recommendations</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {cropInfo.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soil Quality */}
      <Card>
        <CardHeader>
          <CardTitle>Soil Quality Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Soil Moisture</span>
                  <span className="text-sm font-medium">{soilData.moisture}%</span>
                </div>
                <Progress value={soilData.moisture} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">pH Level</span>
                  <span className="text-sm font-medium">{soilData.ph}</span>
                </div>
                <Progress value={(soilData.ph - 4) / 6 * 100} className="h-2" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Nitrogen</p>
                <p className="font-medium">{soilData.nitrogen} kg/ha</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Phosphorus</p>
                <p className="font-medium">{soilData.phosphorus} kg/ha</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Potassium</p>
                <p className="font-medium">{soilData.potassium} kg/ha</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            7-Day Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weatherForecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  {getWeatherIcon(day.condition)}
                  <div>
                    <p className="font-medium">{day.day}</p>
                    <p className="text-sm text-muted-foreground capitalize">{day.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{day.temp}°C</p>
                  <p className="text-sm text-blue-600">{day.rain}mm</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CloudRain className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-900">Weekly Summary</span>
            </div>
            <p className="text-sm text-blue-800">
              Expected rainfall: {weeklyRainfall}mm | Average temperature: {Math.round(weatherForecast.reduce((sum, day) => sum + day.temp, 0) / weatherForecast.length)}°C
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Water Quality Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Water Quality for Agriculture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Irrigation Water pH</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{waterQuality.ph.toFixed(1)}</span>
                {waterQuality.ph >= 6.5 && waterQuality.ph <= 8.0 ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Total Dissolved Solids</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{waterQuality.tds.toFixed(0)} ppm</span>
                {waterQuality.tds < 450 ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="font-medium mb-2">Irrigation Impact</p>
              <div className="text-sm text-muted-foreground space-y-1">
                {waterQuality.ph >= 6.5 && waterQuality.ph <= 8.0 ? (
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    pH level is ideal for most crops
                  </p>
                ) : (
                  <p className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                    Consider pH adjustment for optimal crop growth
                  </p>
                )}
                {waterQuality.tds < 450 ? (
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Low salinity - suitable for all crops
                  </p>
                ) : (
                  <p className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                    Moderate salinity - monitor salt-sensitive crops
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}