import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { WaterData } from '../App';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface TrendsViewProps {
  waterData: WaterData[];
}

export function TrendsView({ waterData }: TrendsViewProps) {
  const [selectedMetric, setSelectedMetric] = useState<'level' | 'ph' | 'tds' | 'hardness'>('level');
  const [timeFrame, setTimeFrame] = useState<'24h' | '7d' | 'forecast'>('24h');

  // Generate historical data for different time frames
  const generateHistoricalData = (hours: number) => {
    const data = [];
    const now = new Date();
    
    for (let i = hours; i > 0; i--) {
      const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
      const baseValue = waterData[0] ? waterData[0][selectedMetric] : 25;
      const variation = (Math.random() - 0.5) * 0.2;
      
      data.push({
        time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: timestamp.toISOString(),
        value: Math.max(0, baseValue + variation * baseValue),
        location: 'Average'
      });
    }
    
    return data;
  };

  // Generate forecast data
  const generateForecastData = () => {
    const data = [];
    const now = new Date();
    const currentValue = waterData[0] ? waterData[0][selectedMetric] : 25;
    
    for (let i = 1; i <= 24; i++) {
      const timestamp = new Date(now.getTime() + (i * 60 * 60 * 1000));
      const trend = selectedMetric === 'level' ? -0.002 : 0.001; // Slight declining trend for water level
      const seasonalVariation = Math.sin(i * Math.PI / 12) * 0.1;
      const randomVariation = (Math.random() - 0.5) * 0.1;
      
      const forecastValue = currentValue * (1 + (trend * i) + seasonalVariation + randomVariation);
      
      data.push({
        time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: timestamp.toISOString(),
        value: Math.max(0, forecastValue),
        location: 'Forecast',
        isForecast: true
      });
    }
    
    return data;
  };

  const chartData = useMemo(() => {
    switch (timeFrame) {
      case '24h':
        return generateHistoricalData(24);
      case '7d':
        return generateHistoricalData(168); // 7 days * 24 hours
      case 'forecast':
        return generateForecastData();
      default:
        return generateHistoricalData(24);
    }
  }, [selectedMetric, timeFrame, waterData]);

  const getMetricInfo = (metric: typeof selectedMetric) => {
    switch (metric) {
      case 'level':
        return { 
          label: 'Water Level', 
          unit: 'm', 
          color: '#3b82f6',
          icon: TrendingDown,
          description: 'Groundwater depth from surface'
        };
      case 'ph':
        return { 
          label: 'pH Level', 
          unit: '', 
          color: '#10b981',
          icon: Activity,
          description: 'Water acidity/alkalinity'
        };
      case 'tds':
        return { 
          label: 'TDS', 
          unit: 'ppm', 
          color: '#f59e0b',
          icon: TrendingUp,
          description: 'Total dissolved solids'
        };
      case 'hardness':
        return { 
          label: 'Hardness', 
          unit: 'mg/L', 
          color: '#8b5cf6',
          icon: Activity,
          description: 'Water mineral content'
        };
    }
  };

  const currentMetric = getMetricInfo(selectedMetric);
  const currentValue = chartData[chartData.length - 1]?.value || 0;
  const previousValue = chartData[chartData.length - 2]?.value || 0;
  const change = ((currentValue - previousValue) / previousValue) * 100;

  const getStatusBadge = () => {
    if (selectedMetric === 'level') {
      if (currentValue < 10) return <Badge variant="destructive">Critical Low</Badge>;
      if (currentValue < 20) return <Badge variant="secondary">Low</Badge>;
      return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
    }
    
    if (selectedMetric === 'ph') {
      if (currentValue < 6.5 || currentValue > 8.5) return <Badge variant="destructive">Unsafe</Badge>;
      return <Badge className="bg-green-100 text-green-800">Safe</Badge>;
    }
    
    if (selectedMetric === 'tds') {
      if (currentValue > 500) return <Badge variant="destructive">High</Badge>;
      if (currentValue > 300) return <Badge variant="secondary">Moderate</Badge>;
      return <Badge className="bg-green-100 text-green-800">Low</Badge>;
    }
    
    return <Badge>Normal</Badge>;
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2>Trends & Forecasts</h2>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Time Frame Selection */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={timeFrame === '24h' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeFrame('24h')}
        >
          24 Hours
        </Button>
        <Button
          variant={timeFrame === '7d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeFrame('7d')}
        >
          7 Days
        </Button>
        <Button
          variant={timeFrame === 'forecast' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeFrame('forecast')}
        >
          24h Forecast
        </Button>
      </div>

      {/* Metric Selection */}
      <div className="grid grid-cols-4 gap-2">
        {(['level', 'ph', 'tds', 'hardness'] as const).map((metric) => {
          const info = getMetricInfo(metric);
          const Icon = info.icon;
          
          return (
            <Button
              key={metric}
              variant={selectedMetric === metric ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMetric(metric)}
              className="flex flex-col h-auto py-3"
            >
              <Icon className="w-4 h-4 mb-1" />
              <span className="text-xs">{info.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Current Value Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{currentMetric.label}</h3>
              <p className="text-sm text-muted-foreground">{currentMetric.description}</p>
            </div>
            {getStatusBadge()}
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-medium">
              {currentValue.toFixed(1)}{currentMetric.unit}
            </span>
            <div className={`flex items-center gap-1 text-sm ${
              change > 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              {change > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {timeFrame === 'forecast' ? 'Forecast' : 'Historical'} Trends
            {timeFrame === 'forecast' && (
              <Badge variant="secondary" className="text-xs">
                AI Predicted
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="time" 
                  fontSize={12}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  fontSize={12}
                  domain={['dataMin - 1', 'dataMax + 1']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={currentMetric.color}
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray={timeFrame === 'forecast' ? '5 5' : '0'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {timeFrame === 'forecast' && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Forecast Insights</span>
              </div>
              <p className="text-sm text-blue-800">
                Based on current trends and seasonal patterns, {currentMetric.label.toLowerCase()} is expected to{' '}
                {change > 0 ? 'increase' : 'decrease'} by {Math.abs(change).toFixed(1)}% over the next 24 hours.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm">Maximum</span>
            </div>
            <div className="text-xl font-medium">
              {Math.max(...chartData.map(d => d.value)).toFixed(1)}{currentMetric.unit}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Highest recorded value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-sm">Minimum</span>
            </div>
            <div className="text-xl font-medium">
              {Math.min(...chartData.map(d => d.value)).toFixed(1)}{currentMetric.unit}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Lowest recorded value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {selectedMetric === 'level' && currentValue < 15 && (
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <TrendingDown className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900">Water Conservation Alert</p>
                  <p className="text-sm text-yellow-800">
                    Consider implementing water conservation measures. Current level is below optimal range.
                  </p>
                </div>
              </div>
            )}
            
            {selectedMetric === 'ph' && (currentValue < 6.8 || currentValue > 8.2) && (
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <Activity className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900">pH Treatment Required</p>
                  <p className="text-sm text-red-800">
                    Water pH is outside safe range. Consider treatment before consumption or irrigation.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Monitoring Active</p>
                <p className="text-sm text-blue-800">
                  DWLR sensors are providing real-time data. Next calibration scheduled for next month.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}