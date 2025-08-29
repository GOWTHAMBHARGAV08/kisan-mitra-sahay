import React from 'react';
import { Calendar, TrendingUp, Bug, Droplets, AlertTriangle } from 'lucide-react';
import WeatherCard from '@/components/WeatherCard';
import QuickActionCard from '@/components/QuickActionCard';
import PestRiskGauge from '@/components/PestRiskGauge';
import heroField from '@/assets/hero-field.jpg';

const Dashboard = () => {
  const quickActions = [
    {
      icon: Calendar,
      title: '7-Day Forecast',
      subtitle: 'Detailed weather ahead',
      variant: 'primary' as const
    },
    {
      icon: TrendingUp,
      title: 'Seasonal Outlook',
      subtitle: '3-6 months ahead',
      variant: 'secondary' as const
    },
    {
      icon: Bug,
      title: 'Pest Risk Today',
      subtitle: 'Check crop threats',
      variant: 'accent' as const
    },
    {
      icon: Droplets,
      title: 'Soil & Irrigation',
      subtitle: 'Watering guidance',
      variant: 'primary' as const
    }
  ];

  const alerts = [
    {
      type: 'high',
      message: '⚠️ High Fall Armyworm risk for maize in Guntur (next 72h)',
      action: 'Apply preventive measures'
    },
    {
      type: 'medium',
      message: '🌡️ Heat wave expected Friday - adjust irrigation timing',
      action: 'Schedule early morning watering'
    }
  ];

  const recommendations = [
    {
      title: 'Apply Neem Oil Treatment',
      description: 'Neem Oil 3% @ 3 ml/L in early morning; repeat after 7 days if pest persists.',
      urgency: 'high'
    },
    {
      title: 'Optimize Irrigation Schedule',
      description: 'Water between 5-7 AM to reduce evaporation. Soil moisture at 70% optimal.',
      urgency: 'medium'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div 
        className="relative h-32 md:h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroField})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
        <div className="relative h-full flex items-center px-4 md:px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Good Morning, Farmer! 🌱
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              Today is {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Current Weather */}
        <WeatherCard />

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                icon={action.icon}
                title={action.title}
                subtitle={action.subtitle}
                variant={action.variant}
                onClick={() => console.log(`Navigate to ${action.title}`)}
              />
            ))}
          </div>
        </section>

        {/* Charts and Widgets Row */}
        <section className="grid md:grid-cols-3 gap-6">
          {/* Temperature Chart Placeholder */}
          <div className="chart-container">
            <h3 className="font-semibold text-sm text-foreground mb-3">Next 24h Temperature</h3>
            <div className="h-32 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">24h Line Chart</p>
                <p className="text-xs">28°C - 35°C range</p>
              </div>
            </div>
          </div>

          {/* Rainfall Chart Placeholder */}
          <div className="chart-container">
            <h3 className="font-semibold text-sm text-foreground mb-3">7-Day Rainfall</h3>
            <div className="h-32 bg-gradient-to-r from-info/10 to-info/20 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Droplets className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Bar Chart</p>
                <p className="text-xs">20%, 60%, 10% chances</p>
              </div>
            </div>
          </div>

          {/* Pest Risk Gauge */}
          <PestRiskGauge riskLevel={65} pestType="Fall Armyworm" cropType="Maize" />
        </section>

        {/* Alerts */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Active Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div 
                key={index}
                className={`alert-banner alert-${alert.type}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">{alert.message}</p>
                    <p className="text-xs opacity-80">{alert.action}</p>
                  </div>
                  <AlertTriangle className="w-5 h-5 ml-3 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Smart Recommendations */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Smart Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    rec.urgency === 'high' 
                      ? 'bg-danger/20 text-danger' 
                      : 'bg-warning/20 text-warning'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-accent-foreground mb-2">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-accent-foreground/80 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-8">
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Need More Guidance?
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get personalized advice from our AI agriculture assistant
            </p>
            <button className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:shadow-floating transition-all">
              Open Chat for Guidance
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;