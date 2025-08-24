import React from 'react';
import styles from './styles.module.css';

interface ChartCardItem {
  icon: string;
  value: string;
  label: string;
  details?: string[]; // Array of detail strings
  gradient?: string; // Individual gradient for each card
  shadowColor?: string; // Individual shadow for each card
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  items: ChartCardItem[];
  gradient: string;
  shadowColor: string;
  layout?: 'grid' | 'flex';
  itemMinWidth?: string;
  specialHighlight?: number; // index of item to highlight
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  items,
  gradient,
  shadowColor,
  layout = 'flex',
  itemMinWidth = '140px',
  specialHighlight
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '25px',
      background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
      borderRadius: '15px',
      border: '1px solid #dee2e6',
      margin: '20px 0'
    }}>
      
      <h5 style={{textAlign: 'center', color: '#495057', marginBottom: '15px'}}>
        {title}
      </h5>
      
      {subtitle && (
        <p style={{textAlign: 'center', color: '#6c757d', fontSize: '14px', margin: '0 0 10px 0'}}>
          {subtitle}
        </p>
      )}

      <div style={{
        display: layout === 'grid' ? 'grid' : 'flex',
        gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fit, minmax(200px, 1fr))' : undefined,
        flexWrap: layout === 'flex' ? 'wrap' : undefined,
        justifyContent: 'center',
        gap: '15px'
      }}>
        {items.map((item, index) => {
          const isSpecial = specialHighlight === index;
          const itemGradient = item.gradient || gradient; // Use individual gradient or fallback to global
          const itemShadowColor = item.shadowColor || shadowColor; // Use individual shadow or fallback to global
          
          return (
            <div
              key={index}
              style={{
                background: itemGradient,
                color: 'white',
                padding: '18px 22px',
                borderRadius: '12px',
                textAlign: 'center',
                minWidth: itemMinWidth,
                boxShadow: `0 4px 8px ${itemShadowColor}`,
                border: isSpecial ? '3px solid #fff' : '2px solid rgba(255,255,255,0.2)',
                transform: isSpecial ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.2s ease'
              }}
            >
              <div style={{fontSize: '24px', marginBottom: '8px'}}>{item.icon}</div>
              <div style={{fontSize: '18px', fontWeight: 'bold'}}>{item.value}</div>
              <div style={{fontSize: '12px', opacity: '0.9', marginTop: '5px'}}>{item.label}</div>
              {item.details && item.details.map((detail, detailIndex) => (
                <div
                  key={detailIndex}
                  style={{
                    fontSize: '10px', 
                    marginTop: '4px', 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '3px 8px', 
                    borderRadius: '6px',
                    lineHeight: '1.2'
                  }}
                >
                  {detail}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartCard;
