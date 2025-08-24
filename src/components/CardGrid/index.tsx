import React from 'react';

interface CardItem {
  icon: string;
  title: string;
  value?: string;
  description?: string;
  details?: string[];
  gradient: string;
  shadowColor?: string;
  size?: 'small' | 'medium' | 'large';
  special?: boolean; // for highlighting special cards
}

interface CardGridProps {
  title: string;
  subtitle?: string;
  items: CardItem[];
  layout?: 'grid' | 'flex';
  columns?: number;
  gap?: string;
  maxWidth?: string;
  containerStyle?: React.CSSProperties;
}

const CardGrid: React.FC<CardGridProps> = ({
  title,
  subtitle,
  items,
  layout = 'flex',
  columns = 4,
  gap = '15px',
  maxWidth = '800px',
  containerStyle = {}
}) => {
  const getSizeStyles = (size: 'small' | 'medium' | 'large' = 'medium') => {
    const sizes = {
      small: { padding: '12px 16px', minWidth: '140px', fontSize: { icon: '20px', title: '14px', value: '16px' } },
      medium: { padding: '18px 22px', minWidth: '170px', fontSize: { icon: '24px', title: '16px', value: '18px' } },
      large: { padding: '24px 28px', minWidth: '200px', fontSize: { icon: '28px', title: '18px', value: '20px' } }
    };
    return sizes[size];
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '25px',
      background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
      borderRadius: '15px',
      border: '1px solid #dee2e6',
      margin: '20px 0',
      ...containerStyle
    }}>
      
      <h5 style={{ textAlign: 'center', color: '#495057', marginBottom: subtitle ? '10px' : '0' }}>
        {title}
      </h5>
      
      {subtitle && (
        <p style={{ textAlign: 'center', color: '#6c757d', fontSize: '14px', margin: '0 0 15px 0' }}>
          {subtitle}
        </p>
      )}

      <div style={{
        display: layout === 'grid' ? 'grid' : 'flex',
        gridTemplateColumns: layout === 'grid' ? `repeat(auto-fit, minmax(180px, 1fr))` : undefined,
        flexWrap: layout === 'flex' ? 'wrap' : undefined,
        justifyContent: 'center',
        gap: gap,
        maxWidth: maxWidth,
        width: '100%'
      }}>
        {items.map((item, index) => {
          const sizeStyles = getSizeStyles(item.size);
          
          return (
            <div
              key={index}
              style={{
                background: item.gradient,
                color: 'white',
                padding: sizeStyles.padding,
                borderRadius: '12px',
                textAlign: 'center',
                minWidth: sizeStyles.minWidth,
                boxShadow: item.shadowColor ? `0 4px 8px ${item.shadowColor}` : '0 4px 8px rgba(0,0,0,0.3)',
                border: item.special ? '3px solid #fff' : '2px solid rgba(255,255,255,0.2)',
                transform: item.special ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = item.special ? 'scale(1.08)' : 'scale(1.03)';
                e.currentTarget.style.boxShadow = item.shadowColor ? 
                  `0 8px 16px ${item.shadowColor}` : '0 8px 16px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = item.special ? 'scale(1.05)' : 'scale(1)';
                e.currentTarget.style.boxShadow = item.shadowColor ? 
                  `0 4px 8px ${item.shadowColor}` : '0 4px 8px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ fontSize: sizeStyles.fontSize.icon, marginBottom: '8px' }}>
                {item.icon}
              </div>
              
              {item.value && (
                <div style={{ 
                  fontSize: sizeStyles.fontSize.value, 
                  fontWeight: 'bold', 
                  marginBottom: '4px' 
                }}>
                  {item.value}
                </div>
              )}
              
              <div style={{ 
                fontSize: sizeStyles.fontSize.title, 
                fontWeight: 'bold', 
                marginBottom: item.description ? '6px' : '0' 
              }}>
                {item.title}
              </div>
              
              {item.description && (
                <div style={{ 
                  fontSize: '11px', 
                  opacity: '0.9', 
                  lineHeight: '1.3', 
                  marginBottom: item.details ? '8px' : '0' 
                }}>
                  {item.description}
                </div>
              )}
              
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

export default CardGrid;
