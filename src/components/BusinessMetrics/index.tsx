import React from 'react';

interface MetricItem {
  icon: string;
  label: string;
  value: string;
  improvement?: string;
  description?: string;
  gradient?: string;
  shadowColor?: string;
  special?: boolean;
}

interface MetricSection {
  title: string;
  subtitle?: string;
  items: MetricItem[];
  sectionGradient: string;
  sectionBorder: string;
  titleColor: string;
}

interface BusinessMetricsProps {
  title: string;
  subtitle?: string;
  sections: MetricSection[];
  conclusion?: {
    text: string;
    highlight?: string;
    subtext?: string;
    gradient?: string;
  };
  layout?: 'vertical' | 'horizontal';
  containerGradient?: string;
}

const BusinessMetrics: React.FC<BusinessMetricsProps> = ({
  title,
  subtitle,
  sections,
  conclusion,
  layout = 'vertical',
  containerGradient = 'linear-gradient(135deg, #f8f9fa, #e9ecef)'
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      padding: '25px',
      background: containerGradient,
      borderRadius: '15px',
      border: '1px solid #dee2e6',
      margin: '20px 0'
    }}>

      <h5 style={{ textAlign: 'center', marginBottom: '10px', color: '#495057' }}>
        {title}
      </h5>
      
      {subtitle && (
        <p style={{ textAlign: 'center', color: '#6c757d', fontSize: '14px', margin: '0 0 20px 0' }}>
          {subtitle}
        </p>
      )}

      <div style={{
        display: 'flex',
        flexDirection: layout === 'vertical' ? 'column' : 'row',
        gap: layout === 'vertical' ? '30px' : '20px',
        flexWrap: layout === 'horizontal' ? 'wrap' : 'nowrap'
      }}>

        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            style={{
              background: section.sectionGradient,
              padding: '25px',
              borderRadius: '12px',
              border: `2px solid ${section.sectionBorder}`,
              flex: layout === 'horizontal' ? '1 1 300px' : 'none'
            }}
          >
            <h6 style={{
              color: section.titleColor,
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '16px'
            }}>
              {section.title}
            </h6>
            
            {section.subtitle && (
              <p style={{
                textAlign: 'center',
                fontSize: '12px',
                opacity: 0.8,
                margin: '0 0 15px 0',
                color: section.titleColor
              }}>
                {section.subtitle}
              </p>
            )}
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '15px'
            }}>
              {section.items.map((item, itemIndex) => {
                const defaultGradient = sectionIndex % 2 === 0 
                  ? `linear-gradient(135deg, ${['#f44336', '#e57373', '#ef5350', '#ffab91', '#ff8a65', '#ff7043'][itemIndex] || '#f44336'}, ${['#d32f2f', '#c62828', '#b71c1c', '#ff5722', '#d84315', '#bf360c'][itemIndex] || '#d32f2f'})`
                  : `linear-gradient(135deg, ${['#4caf50', '#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9', '#dcedc8'][itemIndex] || '#4caf50'}, ${['#2e7d32', '#388e3c', '#4caf50', '#66bb6a', '#81c784', '#aed581'][itemIndex] || '#2e7d32'})`;
                
                return (
                  <div
                    key={itemIndex}
                    style={{
                      background: item.gradient || defaultGradient,
                      color: 'white',
                      padding: '18px 22px',
                      borderRadius: '12px',
                      textAlign: 'center',
                      minWidth: '160px',
                      boxShadow: item.shadowColor || '0 4px 8px rgba(0,0,0,0.3)',
                      border: item.special ? '3px solid #fff' : '2px solid rgba(255,255,255,0.2)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                      {item.icon}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: '12px', opacity: '0.9', marginTop: '5px' }}>
                      {item.label}
                    </div>
                    {item.description && (
                      <div style={{
                        fontSize: '10px',
                        marginTop: '6px',
                        background: 'rgba(255,255,255,0.2)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        lineHeight: '1.2'
                      }}>
                        {item.description}
                      </div>
                    )}
                    {item.improvement && (
                      <div style={{
                        fontSize: '10px',
                        marginTop: '4px',
                        background: 'rgba(255,255,255,0.2)',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}>
                        {item.improvement}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

      </div>

      {conclusion && (
        <div style={{
          textAlign: 'center',
          padding: '18px',
          background: conclusion.gradient || 'linear-gradient(135deg, #4caf50, #2e7d32)',
          borderRadius: '10px',
          marginTop: '20px',
          color: 'white'
        }}>
          <strong>{conclusion.text}</strong>
          {conclusion.highlight && (
            <>
              {' '}
              <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                {conclusion.highlight}
              </span>
            </>
          )}
          {conclusion.subtext && (
            <>
              <br />
              <small style={{
                fontSize: '14px',
                opacity: '0.9',
                marginTop: '5px',
                display: 'block'
              }}>
                {conclusion.subtext}
              </small>
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default BusinessMetrics;
