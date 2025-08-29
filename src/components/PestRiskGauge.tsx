import React from 'react';
import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';

interface PestRiskGaugeProps {
  riskLevel: number; // 0-100
  pestType?: string;
  cropType?: string;
}

const PestRiskGauge: React.FC<PestRiskGaugeProps> = ({
  riskLevel = 65,
  pestType = "Fall Armyworm",
  cropType = "Maize"
}) => {
  const getRiskColor = () => {
    if (riskLevel <= 30) return 'text-success border-success';
    if (riskLevel <= 70) return 'text-warning border-warning';
    return 'text-danger border-danger';
  };

  const getRiskLabel = () => {
    if (riskLevel <= 30) return 'Low';
    if (riskLevel <= 70) return 'Medium';
    return 'High';
  };

  const getRiskIcon = () => {
    if (riskLevel <= 30) return Shield;
    if (riskLevel <= 70) return AlertCircle;
    return AlertTriangle;
  };

  const RiskIcon = getRiskIcon();
  const circumference = 2 * Math.PI * 45; // radius of 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (riskLevel / 100) * circumference;

  return (
    <div className="chart-container">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-sm text-foreground mb-1">Pest Risk Index</h3>
        <p className="text-xs text-muted-foreground">{pestType} in {cropType}</p>
      </div>

      <div className="relative flex items-center justify-center">
        <svg width="120" height="120" className="rotate-[-90deg]">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted/20"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={getRiskColor()}
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <RiskIcon className={`w-6 h-6 mb-1 ${getRiskColor()}`} />
          <div className="text-2xl font-bold text-foreground">{riskLevel}</div>
          <div className={`text-xs font-medium ${getRiskColor()}`}>
            {getRiskLabel()}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Next 72 hours risk assessment
        </p>
      </div>
    </div>
  );
};

export default PestRiskGauge;