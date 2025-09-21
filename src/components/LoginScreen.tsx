import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User, UserRole } from '../App';
import { Droplets, Users, Factory, Sprout } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && location && role) {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        name,
        location,
        role: role as UserRole
      });
    }
  };

  const getRoleIcon = (roleType: UserRole) => {
    switch (roleType) {
      case 'farmer':
        return <Sprout className="w-8 h-8 text-green-600" />;
      case 'citizen':
        return <Users className="w-8 h-8 text-blue-600" />;
      case 'industry':
        return <Factory className="w-8 h-8 text-orange-600" />;
      case 'researcher':
        return <Droplets className="w-8 h-8 text-purple-600" />;
    }
  };

  const getRoleDescription = (roleType: UserRole) => {
    switch (roleType) {
      case 'farmer':
        return 'Access soil quality data, irrigation recommendations, and crop-specific water insights';
      case 'citizen':
        return 'Monitor local water quality, receive alerts, and view community water status';
      case 'industry':
        return 'View disposal guidelines, compliance data, and industrial water usage reports';
      case 'researcher':
        return 'Access raw data, historical trends, and advanced analytics tools';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
            <Droplets className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Flow State</CardTitle>
          <p className="text-muted-foreground">Real-time Groundwater Monitoring</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="City or region"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">User Type</Label>
              <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">
                    <div className="flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-green-600" />
                      Farmer
                    </div>
                  </SelectItem>
                  <SelectItem value="citizen">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      Citizen
                    </div>
                  </SelectItem>
                  <SelectItem value="industry">
                    <div className="flex items-center gap-2">
                      <Factory className="w-4 h-4 text-orange-600" />
                      Industry
                    </div>
                  </SelectItem>
                  <SelectItem value="researcher">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-purple-600" />
                      Researcher
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {getRoleIcon(role as UserRole)}
                  <span className="font-medium capitalize">{role} Dashboard</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getRoleDescription(role as UserRole)}
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={!name || !location || !role}>
              Access Dashboard
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t">
            <p className="text-xs text-center text-muted-foreground">
              Demo app with simulated DWLR data for educational purposes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
