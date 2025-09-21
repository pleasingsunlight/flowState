import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { WaterData, User } from '../App';
import { 
  Factory, 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  TrendingDown,
  TrendingUp,
  Shield,
  Recycle,
  BarChart3
} from 'lucide-react';

interface IndustryDashboardProps {
  waterData: WaterData[];
  user: User;
}

export function IndustryDashboard({ waterData, user }: IndustryDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<'discharge' | 'intake' | 'treatment'>('discharge');

  // Mock industrial data
  const industrialData = {
    waterUsage: {
      daily: 850, // cubic meters
      monthly: 25500,
      efficiency: 85
    },
    discharge: {
      volume: 680, // cubic meters per day
      treatmentEfficiency: 92,
      phLevel: 7.2,
      bod: 15, // mg/L
      cod: 45, // mg/L
      tss: 12 // mg/L
    },
    compliance: {
      score: 94,
      violations: 0,
      lastAudit: '2024-08-15',
      nextAudit: '2024-11-15'
    }
  };

  const disposalGuidelines = {
    discharge: [
      { parameter: 'pH', limit: '6.5-8.5', current: 7.2, status: 'compliant' },
      { parameter: 'BOD', limit: '< 30 mg/L', current: 15, status: 'compliant' },
      { parameter: 'COD', limit: '< 100 mg/L', current: 45, status: 'compliant' },
      { parameter: 'TSS', limit: '< 50 mg/L', current: 12, status: 'compliant' },
      { parameter: 'Temperature', limit: '< 40°C', current: 28, status: 'compliant' }
    ],
    intake: [
      { parameter: 'Daily Limit', limit: '1000 m³/day', current: 850, status: 'compliant' },
      { parameter: 'Groundwater Level', limit: '> 10m', current: waterData[0]?.level || 20, status: 'compliant' },
      { parameter: 'pH Range', limit: '6.0-9.0', current: waterData[0]?.ph || 7.5, status: 'compliant' },
      { parameter: 'TDS', limit: '< 1000 ppm', current: waterData[0]?.tds || 400, status: 'compliant' }
    ],
    treatment: [
      { parameter: 'Treatment Efficiency', limit: '> 90%', current: 92, status: 'compliant' },
      { parameter: 'Sludge Management', limit: 'Proper disposal', current: 100, status: 'compliant' },
      { parameter: 'Chemical Usage', limit: 'Optimized', current: 85, status: 'good' },
      { parameter: 'Energy Efficiency', limit: '> 80%', current: 88, status: 'compliant' }
    ]
  };

  const getAverageWaterLevel = () => {
    if (waterData.length === 0) return 0;
    return waterData.reduce((sum, data) => sum + data.level, 0) / waterData.length;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'violation':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'violation':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const avgWaterLevel = getAverageWaterLevel();

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <Factory className="w-6 h-6" />
          <h2>Industry Dashboard</h2>
        </div>
        <p className="text-orange-100">Welcome, {user.name}</p>
        <p className="text-orange-100 text-sm">Water management for {user.location}</p>
      </div>

      {/* Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {industrialData.compliance.score}%
              </div>
              <p className="text-sm text-muted-foreground">Compliance Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {industrialData.compliance.violations}
              </div>
              <p className="text-sm text-muted-foreground">Active Violations</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>Last Audit: {new Date(industrialData.compliance.lastAudit).toLocaleDateString()}</span>
            <span>Next Audit: {new Date(industrialData.compliance.nextAudit).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Daily Usage</span>
            </div>
            <div className="text-xl font-medium">
              {industrialData.waterUsage.daily} m³
            </div>
            <Progress value={85} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              85% of daily limit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Recycle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Treatment Efficiency</span>
            </div>
            <div className="text-xl font-medium">
              {industrialData.discharge.treatmentEfficiency}%
            </div>
            <Progress value={industrialData.discharge.treatmentEfficiency} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Above required 90%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Disposal Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Water Disposal Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="discharge">Discharge</TabsTrigger>
              <TabsTrigger value="intake">Intake</TabsTrigger>
              <TabsTrigger value="treatment">Treatment</TabsTrigger>
            </TabsList>

            <TabsContent value="discharge" className="space-y-4">
              <div className="space-y-3">
                {disposalGuidelines.discharge.map((guideline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(guideline.status)}
                      <div>
                        <p className="font-medium">{guideline.parameter}</p>
                        <p className="text-sm text-muted-foreground">
                          Limit: {guideline.limit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{guideline.current}{guideline.parameter === 'pH' ? '' : typeof guideline.current === 'number' && guideline.current > 100 ? '' : guideline.parameter.includes('mg/L') ? ' mg/L' : guideline.parameter.includes('°C') ? '°C' : ''}</p>
                      <Badge className={getStatusColor(guideline.status)}>
                        {guideline.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="intake" className="space-y-4">
              <div className="space-y-3">
                {disposalGuidelines.intake.map((guideline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(guideline.status)}
                      <div>
                        <p className="font-medium">{guideline.parameter}</p>
                        <p className="text-sm text-muted-foreground">
                          Limit: {guideline.limit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {guideline.current}
                        {guideline.parameter.includes('m³') ? ' m³' : 
                         guideline.parameter.includes('Level') ? 'm' : 
                         guideline.parameter.includes('TDS') ? ' ppm' : ''}
                      </p>
                      <Badge className={getStatusColor(guideline.status)}>
                        {guideline.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="treatment" className="space-y-4">
              <div className="space-y-3">
                {disposalGuidelines.treatment.map((guideline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(guideline.status)}
                      <div>
                        <p className="font-medium">{guideline.parameter}</p>
                        <p className="text-sm text-muted-foreground">
                          Target: {guideline.limit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {guideline.current}
                        {guideline.parameter.includes('Efficiency') ? '%' : 
                         guideline.parameter.includes('Management') ? '%' : 
                         guideline.parameter.includes('Usage') ? '%' : 
                         guideline.parameter.includes('Energy') ? '%' : ''}
                      </p>
                      <Badge className={getStatusColor(guideline.status)}>
                        {guideline.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Water Usage Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Usage Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Daily Average</p>
                <p className="text-lg font-medium">{industrialData.waterUsage.daily} m³</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Monthly Total</p>
                <p className="text-lg font-medium">{industrialData.waterUsage.monthly} m³</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-muted-foreground">Efficiency</p>
                <p className="text-lg font-medium">{industrialData.waterUsage.efficiency}%</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Optimization Recommendations</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                  <p>Water efficiency is above industry average. Consider sharing best practices.</p>
                </div>
                <div className="flex items-start gap-2">
                  <Recycle className="w-4 h-4 text-blue-500 mt-0.5" />
                  <p>Explore additional water recycling opportunities to reduce intake.</p>
                </div>
                <div className="flex items-start gap-2">
                  <BarChart3 className="w-4 h-4 text-orange-500 mt-0.5" />
                  <p>Monitor peak usage hours to optimize treatment plant operations.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Groundwater Impact</span>
              <div className="flex items-center gap-2">
                {avgWaterLevel > 15 ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <Badge className="bg-green-100 text-green-800">Low Impact</Badge>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <Badge className="bg-yellow-100 text-yellow-800">Monitor</Badge>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Discharge Quality</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <Badge className="bg-green-100 text-green-800">Excellent</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Regulatory Compliance</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <Badge className="bg-green-100 text-green-800">Full Compliance</Badge>
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="font-medium mb-2">Sustainability Metrics</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Water recycling rate: 65%</p>
                <p>• Energy efficiency: 88%</p>
                <p>• Carbon footprint: -12% vs last year</p>
                <p>• Zero discharge violations in last 12 months</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto py-3 flex flex-col">
              <FileText className="w-5 h-5 mb-2" />
              <span className="text-sm">Download Report</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex flex-col">
              <BarChart3 className="w-5 h-5 mb-2" />
              <span className="text-sm">View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex flex-col">
              <Shield className="w-5 h-5 mb-2" />
              <span className="text-sm">Compliance Check</span>
            </Button>
            <Button variant="outline" className="h-auto py-3 flex flex-col">
              <AlertTriangle className="w-5 h-5 mb-2" />
              <span className="text-sm">Report Issue</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}