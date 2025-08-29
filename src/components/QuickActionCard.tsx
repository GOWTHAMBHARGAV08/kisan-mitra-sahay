import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  onClick,
  variant = 'primary'
}) => {
  const getCardStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground';
      case 'accent':
        return 'bg-gradient-to-br from-accent to-accent/80 text-accent-foreground';
      default:
        return 'quick-action-card';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${getCardStyles()} w-full text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2`}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs opacity-90">{subtitle}</p>
        </div>
      </div>
    </button>
  );
};

export default QuickActionCard;