import React, { useState, useEffect } from 'react';
import { Alert } from '../App';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { AlertTriangle, X, Info, AlertCircle } from 'lucide-react';

interface AlertSystemProps {
  alerts: Alert[];
}

export function AlertSystem({ alerts }: AlertSystemProps) {
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  useEffect(() => {
    // Show only recent alerts that haven't been dismissed
    const recentAlerts = alerts
      .filter(alert => !dismissedAlerts.includes(alert.id))
      .filter(alert => {
        const alertTime = new Date(alert.timestamp).getTime();
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        return (now - alertTime) < fiveMinutes;
      })
      .slice(0, 2); // Show max 2 alerts at once

    setVisibleAlerts(recentAlerts);
  }, [alerts, dismissedAlerts]);

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
    }
  };

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-16 left-4 right-4 z-50 space-y-2">
      {visibleAlerts.map((alert) => (
        <Card key={alert.id} className={`${getAlertColor(alert.type)} border shadow-lg`}>
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <Badge 
                    variant={alert.type === 'critical' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {alert.location && `${alert.location} • `}
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert(alert.id)}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
