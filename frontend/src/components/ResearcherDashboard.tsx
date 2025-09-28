import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Database, 
  FileText,
  Download,
  Calendar,
  Filter,
  Microscope,
  Activity,
  AlertCircle,
  CheckCircle,
  Target
} from 'lucide-react';

export function ResearcherDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedDataset, setSelectedDataset] = useState('all');

  // Mock research data
  const researchStats = {
    totalDataPoints: 2847,
    activeSites: 24,
    correlationScore: 0.85,
    reportsGenerated: 12,
    anomaliesDetected: 8,
    modelsCreated: 3
  };

  // Mock correlation data
  const correlationData = [
    { month: 'Jan', temperature: 16.2, waterLevel: 78, rainfall: 45, quality: 7.8 },
    { month: 'Feb', temperature: 17.1, waterLevel: 75, rainfall: 38, quality: 7.6 },
    { month: 'Mar', temperature: 18.8, waterLevel: 72, rainfall: 42, quality: 7.9 },
    { month: 'Apr', temperature: 21.2, waterLevel: 68, rainfall: 35, quality: 7.5 },
    { month: 'May', temperature: 24.1, waterLevel: 65, rainfall: 28, quality: 7.3 },
    { month: 'Jun', temperature: 26.8, waterLevel: 58, rainfall: 15, quality: 7.1 }
  ];

  // Mock site performance data
  const sitePerformanceData = [
    { site: 'Central Aquifer', reliability: 98, dataQuality: 95, coverage: 100 },
    { site: 'West Ridge', reliability: 94, dataQuality: 92, coverage: 98 },
    { site: 'North Valley', reliability: 89, dataQuality: 87, coverage: 95 },
    { site: 'East Basin', reliability: 91, dataQuality: 89, coverage: 97 },
    { site: 'South Creek', reliability: 96, dataQuality: 94, coverage: 99 }
  ];

  // Mock anomaly detection data
  const anomalyData = [
    { time: '00:00', normal: 78, detected: 78, threshold: 80 },
    { time: '04:00', normal: 76, detected: 76, threshold: 80 },
    { time: '08:00', normal: 74, detected: 74, threshold: 80 },
    { time: '12:00', normal: 72, detected: 68, threshold: 80 },
    { time: '16:00', normal: 70, detected: 62, threshold: 80 },
    { time: '20:00', normal: 68, detected: 65, threshold: 80 },
    { time: '24:00', normal: 66, detected: 66, threshold: 80 }
  ];

  const recentFindings = [
    {
      id: 1,
      title: 'Temperature-Level Correlation',
      description: 'Strong negative correlation (r=-0.78) between temperature and water levels',
      date: '2 days ago',
      type: 'correlation',
      significance: 'high'
    },
    {
      id: 2,
      title: 'Seasonal Pattern Identified',
      description: 'Water quality shows consistent seasonal variation across all monitored sites',
      date: '1 week ago',
      type: 'pattern',
      significance: 'medium'
    },
    {
      id: 3,
      title: 'Anomaly Detection Model',
      description: 'New ML model achieves 94% accuracy in predicting water level anomalies',
      date: '2 weeks ago',
      type: 'model',
      significance: 'high'
    }
  ];

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'correlation': return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case 'pattern': return <Activity className="w-4 h-4 text-green-600" />;
      case 'model': return <Target className="w-4 h-4 text-purple-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl text-blue-900 mb-2">Research Dashboard</h1>
        <p className="text-blue-700">Advanced analytics and data insights</p>
      </div>

      {/* Research Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="p-2 bg-blue-100 rounded-lg w-fit mx-auto mb-2">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{researchStats.totalDataPoints.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Data Points</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="p-2 bg-green-100 rounded-lg w-fit mx-auto mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{researchStats.correlationScore}</p>
            <p className="text-sm text-gray-600">Correlation</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="p-2 bg-purple-100 rounded-lg w-fit mx-auto mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{researchStats.reportsGenerated}</p>
            <p className="text-sm text-gray-600">Reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Controls */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <select 
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                >
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 3 Months</option>
                  <option value="1y">Last Year</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select 
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                  value={selectedDataset}
                  onChange={(e) => setSelectedDataset(e.target.value)}
                >
                  <option value="all">All Sites</option>
                  <option value="aquifers">Aquifers Only</option>
                  <option value="surface">Surface Water</option>
                  <option value="critical">Critical Sites</option>
                </select>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analytics Tabs */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Advanced Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="correlation" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="correlation">Correlation</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
            </TabsList>
            
            <TabsContent value="correlation" className="mt-4">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Multi-variable correlation analysis showing relationships between environmental factors and water levels.
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={correlationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="waterLevel" stroke="#3b82f6" strokeWidth={2} name="Water Level %" />
                      <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} name="Temperature °C" />
                      <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#10b981" strokeWidth={2} name="Rainfall mm" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">-0.78</p>
                    <p className="text-xs text-gray-600">Temp vs Level</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">0.65</p>
                    <p className="text-xs text-gray-600">Rainfall vs Level</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-lg font-bold text-purple-600">0.42</p>
                    <p className="text-xs text-gray-600">Quality vs Level</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-4">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Site performance metrics including data reliability, quality scores, and coverage analysis.
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sitePerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="site" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="reliability" fill="#3b82f6" name="Reliability %" />
                      <Bar dataKey="dataQuality" fill="#10b981" name="Data Quality %" />
                      <Bar dataKey="coverage" fill="#f59e0b" name="Coverage %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="anomalies" className="mt-4">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Anomaly detection analysis showing detected deviations from normal patterns.
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={anomalyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="normal" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Normal Range" />
                      <Area type="monotone" dataKey="detected" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Detected Values" />
                      <Line type="monotone" dataKey="threshold" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Threshold" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-lg font-bold text-red-600">{researchStats.anomaliesDetected}</p>
                    <p className="text-xs text-gray-600">Anomalies Detected</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">94%</p>
                    <p className="text-xs text-gray-600">Detection Accuracy</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="models" className="mt-4">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Predictive models and machine learning algorithms for water resource management.
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-blue-800">Water Level Prediction Model</h4>
                      <Badge variant="secondary">94% Accuracy</Badge>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      LSTM neural network predicting water levels up to 7 days in advance
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Deploy</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-green-800">Quality Classification Model</h4>
                      <Badge variant="secondary">87% Accuracy</Badge>
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      Random Forest classifier for water quality assessment
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Train</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-purple-800">Anomaly Detection System</h4>
                      <Badge variant="secondary">91% Accuracy</Badge>
                    </div>
                    <p className="text-sm text-purple-700 mb-2">
                      Isolation Forest algorithm for detecting unusual patterns
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Optimize</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Research Findings */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Microscope className="w-5 h-5 text-green-600" />
            <span>Recent Findings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentFindings.map((finding) => (
            <div key={finding.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getTypeIcon(finding.type)}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{finding.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{finding.date}</p>
                  </div>
                </div>
                <Badge variant={getSignificanceColor(finding.significance)}>
                  {finding.significance}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Research Tools */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Research Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Database className="w-4 h-4 mr-2" />
            Data Export & Analysis
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <BarChart3 className="w-4 h-4 mr-2" />
            Statistical Analysis
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Target className="w-4 h-4 mr-2" />
            Model Training
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}