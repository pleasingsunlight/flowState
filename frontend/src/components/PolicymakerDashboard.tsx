import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  Users, 
  DollarSign,
  Target,
  FileText,
  Calendar,
  Download,
  Share2,
  CheckCircle,
  XCircle,
  Clock,
  MapPin
} from 'lucide-react';

export function PolicymakerDashboard() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  // Mock policy-focused data
  const policyMetrics = {
    totalPopulationServed: 125000,
    waterSecurityIndex: 78,
    budgetUtilization: 67,
    criticalSites: 5,
    complianceRate: 94,
    costPerLiter: 0.003
  };

  // Mock regional data
  const regionalData = [
    { region: 'Sikar Road', population: 35000, securityIndex: 65, budget: 15.2, alerts: 3 },
    { region: 'Sanganer', population: 45000, securityIndex: 85, budget: 18.5, alerts: 1 },
    { region: 'Mansarovar', population: 25000, securityIndex: 90, budget: 12.8, alerts: 0 },
    { region: 'Amber', population: 20000, securityIndex: 72, budget: 10.2, alerts: 1 }
  ];

  // Mock budget allocation data (amounts in lakhs INR)
  const budgetData = [
    { category: 'Infrastructure', allocated: 37500, spent: 25875, percentage: 69 },
    { category: 'Monitoring', allocated: 10000, spent: 7417, percentage: 74 },
    { category: 'Maintenance', allocated: 6667, spent: 6000, percentage: 90 },
    { category: 'Research', allocated: 5000, spent: 2833, percentage: 57 },
    { category: 'Emergency', allocated: 3333, spent: 1042, percentage: 31 }
  ];

  // Mock compliance data
  const complianceData = [
    { name: 'Water Quality', value: 96, color: '#10b981' },
    { name: 'Safety Standards', value: 94, color: '#3b82f6' },
    { name: 'Environmental', value: 89, color: '#f59e0b' },
    { name: 'Reporting', value: 97, color: '#8b5cf6' }
  ];

  // Mock trend data
  const trendData = [
    { month: 'Jan', consumption: 85, efficiency: 78, cost: 2.1 },
    { month: 'Feb', consumption: 82, efficiency: 79, cost: 2.0 },
    { month: 'Mar', consumption: 88, efficiency: 81, cost: 2.2 },
    { month: 'Apr', consumption: 91, efficiency: 83, cost: 2.3 },
    { month: 'May', consumption: 95, efficiency: 85, cost: 2.4 },
    { month: 'Jun', consumption: 98, efficiency: 87, cost: 2.5 }
  ];

  const priorityActions = [
    {
      id: 1,
      title: 'Sikar Road Infrastructure Upgrade',
      description: 'Critical water level requires immediate infrastructure investment',
      priority: 'high',
      impact: 'High',
      cost: '₹17.5L',
      timeline: '6 months',
      affectedPopulation: 15000
    },
    {
      id: 2,
      title: 'Water Conservation Program',
      description: 'Implement district-wide conservation measures',
      priority: 'medium',
      impact: 'Medium',
      cost: '₹3.8L',
      timeline: '3 months',
      affectedPopulation: 45000
    },
    {
      id: 3,
      title: 'Monitoring System Expansion',
      description: 'Deploy additional sensors in under-monitored areas',
      priority: 'medium',
      impact: 'Medium',
      cost: '₹5.7L',
      timeline: '4 months',
      affectedPopulation: 25000
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getPriorityBgColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(amount * 1000); // Convert lakhs to rupees for display
  };

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl text-purple-900 mb-2">Policy Dashboard</h1>
        <p className="text-purple-700">Strategic insights and actionable recommendations</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Population Served</p>
                <p className="text-xl text-blue-900">{policyMetrics.totalPopulationServed.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Security Index</p>
                <p className="text-xl text-green-600">{policyMetrics.waterSecurityIndex}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget Used</p>
                <p className="text-xl text-purple-600">{policyMetrics.budgetUtilization}%</p>
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
                <p className="text-sm text-gray-600">Critical Sites</p>
                <p className="text-xl text-red-600">{policyMetrics.criticalSites}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <select 
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="all">All Regions</option>
                  <option value="north">North District</option>
                  <option value="central">Central District</option>
                  <option value="south">South District</option>
                  <option value="east">East District</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <select 
                  className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                >
                  <option value="monthly">Monthly View</option>
                  <option value="quarterly">Quarterly View</option>
                  <option value="yearly">Yearly View</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Overview */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Regional Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {regionalData.map((region, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{region.region}</h4>
                  <p className="text-sm text-gray-600">{region.population.toLocaleString()} residents</p>
                </div>
                <div className="flex items-center space-x-2">
                  {region.alerts > 0 && (
                    <Badge variant="destructive">
                      {region.alerts} alert{region.alerts > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Security Index</span>
                    <span>{region.securityIndex}%</span>
                  </div>
                  <Progress value={region.securityIndex} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Budget Allocation</span>
                    <span>₹{region.budget}L</span>
                  </div>
                  <Progress value={(region.budget / 3) * 100} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Budget Analysis */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>Budget Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="allocated" fill="#e5e7eb" name="Allocated" />
                <Bar dataKey="spent" fill="#3b82f6" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(budgetData.reduce((sum, item) => sum + item.spent, 0))}</p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{Math.round(budgetData.reduce((sum, item) => sum + item.percentage, 0) / budgetData.length)}%</p>
              <p className="text-sm text-gray-600">Avg Utilization</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Dashboard */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Compliance Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {complianceData.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="mb-2">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.value}%
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-600">Compliance Rate</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-green-600">{policyMetrics.complianceRate}%</p>
            <p className="text-sm text-gray-600">Overall Compliance Rate</p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Performance Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="consumption" stroke="#3b82f6" strokeWidth={2} name="Consumption Index" />
                <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} name="Efficiency %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Priority Actions */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-red-600" />
            <span>Priority Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {priorityActions.map((action) => (
            <div key={action.id} className={`p-4 rounded-lg border ${getPriorityBgColor(action.priority)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <Badge variant={getPriorityColor(action.priority)}>
                      {action.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>Cost: {action.cost}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Timeline: {action.timeline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>Affected: {action.affectedPopulation.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span>Impact: {action.impact}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <Button size="sm" variant="outline">
                  Review Details
                </Button>
                <Button size="sm" variant="outline">
                  Approve Funding
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Executive Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-700">
            <FileText className="w-5 h-5" />
            <span>Executive Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Overall water security index has improved by 12% compared to last quarter, indicating effective policy implementation.
            </AlertDescription>
          </Alert>
          
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              North Valley region requires immediate attention with infrastructure investment of $2.1M to prevent service disruption.
            </AlertDescription>
          </Alert>
          
          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              Budget utilization is at 67%, suggesting opportunity for accelerated project implementation in Q4.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}