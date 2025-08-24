import React from 'react';

interface ROIItem {
  icon: string;
  label: string;
  value: string;
  percentage?: string;
  description?: string;
  gradient: string;
  shadowColor?: string;
}

interface ROISection {
  title: string;
  subtitle?: string;
  items: ROIItem[];
  sectionGradient: string;
  titleColor: string;
  totalLabel?: string;
  totalValue?: string;
}

interface ROIAnalysisProps {
  title: string;
  subtitle?: string;
  costSection: ROISection;
  benefitSection: ROISection;
  transformationArrow?: {
    text: string;
    subtext?: string;
    gradient?: string;
  };
  summary?: {
    title: string;
    items: Array<{
      label: string;
      value: string;
      color?: string;
    }>;
    conclusion: {
      text: string;
      highlight: string;
      gradient?: string;
    };
  };
}

const ROIAnalysis: React.FC<ROIAnalysisProps> = ({
  title,
  subtitle,
  costSection,
  benefitSection,
  transformationArrow = {
    text: "🚀 AI TRANSFORMATION",
    subtext: "Investment → Returns",
    gradient: "linear-gradient(135deg, #ff9800, #f57c00)"
  },
  summary
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '25px',
      padding: '30px',
      background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
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
        flexDirection: 'column',
        gap: '25px',
        width: '100%',
        maxWidth: '900px'
      }}>

        {/* Cost Section */}
        <div style={{
          background: costSection.sectionGradient,
          padding: '25px',
          borderRadius: '12px',
          border: '2px solid rgba(244,67,54,0.3)'
        }}>
          <h6 style={{
            color: costSection.titleColor,
            marginBottom: '15px',
            textAlign: 'center',
            fontSize: '18px'
          }}>
            {costSection.title}
          </h6>
          
          {costSection.subtitle && (
            <p style={{
              textAlign: 'center',
              fontSize: '12px',
              opacity: 0.8,
              margin: '0 0 20px 0',
              color: costSection.titleColor
            }}>
              {costSection.subtitle}
            </p>
          )}
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '20px'
          }}>
            {costSection.items.map((item, index) => (
              <div
                key={index}
                style={{
                  background: item.gradient,
                  color: 'white',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  minWidth: '150px',
                  boxShadow: item.shadowColor || '0 3px 6px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{item.icon}</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '11px', opacity: '0.9', lineHeight: '1.2' }}>
                  {item.label}
                </div>
                {item.percentage && (
                  <div style={{
                    fontSize: '10px',
                    marginTop: '4px',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {item.percentage}
                  </div>
                )}
                {item.description && (
                  <div style={{
                    fontSize: '9px',
                    marginTop: '6px',
                    opacity: '0.8',
                    lineHeight: '1.1'
                  }}>
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {costSection.totalLabel && costSection.totalValue && (
            <div style={{
              textAlign: 'center',
              padding: '15px',
              background: 'rgba(244,67,54,0.2)',
              borderRadius: '8px',
              border: '2px solid rgba(244,67,54,0.5)'
            }}>
              <strong style={{ color: '#d32f2f', fontSize: '16px' }}>
                {costSection.totalLabel}: {costSection.totalValue}
              </strong>
            </div>
          )}
        </div>

        {/* Transformation Arrow */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: transformationArrow.gradient,
          borderRadius: '12px',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 6px 15px rgba(255,152,0,0.3)'
        }}>
          <div style={{ fontSize: '20px', marginBottom: '5px' }}>
            {transformationArrow.text}
          </div>
          {transformationArrow.subtext && (
            <small style={{ fontSize: '14px', opacity: '0.9' }}>
              {transformationArrow.subtext}
            </small>
          )}
        </div>

        {/* Benefit Section */}
        <div style={{
          background: benefitSection.sectionGradient,
          padding: '25px',
          borderRadius: '12px',
          border: '2px solid rgba(76,175,80,0.3)'
        }}>
          <h6 style={{
            color: benefitSection.titleColor,
            marginBottom: '15px',
            textAlign: 'center',
            fontSize: '18px'
          }}>
            {benefitSection.title}
          </h6>
          
          {benefitSection.subtitle && (
            <p style={{
              textAlign: 'center',
              fontSize: '12px',
              opacity: 0.8,
              margin: '0 0 20px 0',
              color: benefitSection.titleColor
            }}>
              {benefitSection.subtitle}
            </p>
          )}
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '20px'
          }}>
            {benefitSection.items.map((item, index) => (
              <div
                key={index}
                style={{
                  background: item.gradient,
                  color: 'white',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  minWidth: '150px',
                  boxShadow: item.shadowColor || '0 3px 6px rgba(0,0,0,0.3)',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{item.icon}</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: '11px', opacity: '0.9', lineHeight: '1.2' }}>
                  {item.label}
                </div>
                {item.percentage && (
                  <div style={{
                    fontSize: '10px',
                    marginTop: '4px',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {item.percentage}
                  </div>
                )}
                {item.description && (
                  <div style={{
                    fontSize: '9px',
                    marginTop: '6px',
                    opacity: '0.8',
                    lineHeight: '1.1'
                  }}>
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {benefitSection.totalLabel && benefitSection.totalValue && (
            <div style={{
              textAlign: 'center',
              padding: '15px',
              background: 'rgba(76,175,80,0.2)',
              borderRadius: '8px',
              border: '2px solid rgba(76,175,80,0.5)'
            }}>
              <strong style={{ color: '#2e7d32', fontSize: '16px' }}>
                {benefitSection.totalLabel}: {benefitSection.totalValue}
              </strong>
            </div>
          )}
        </div>

      </div>

      {/* Summary */}
      {summary && (
        <div style={{
          width: '100%',
          maxWidth: '600px',
          background: 'linear-gradient(135deg, #fff, #f8f9fa)',
          padding: '25px',
          borderRadius: '12px',
          border: '2px solid #e9ecef',
          boxShadow: '0 6px 15px rgba(0,0,0,0.1)'
        }}>
          <h6 style={{ textAlign: 'center', marginBottom: '20px', color: '#495057' }}>
            {summary.title}
          </h6>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px'
          }}>
            {summary.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 15px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}
              >
                <span style={{ fontWeight: 'bold', color: '#495057' }}>
                  {item.label}:
                </span>
                <span style={{
                  fontWeight: 'bold',
                  color: item.color || '#007bff',
                  fontSize: '16px'
                }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '15px',
            background: summary.conclusion.gradient || 'linear-gradient(135deg, #28a745, #20c997)',
            borderRadius: '8px',
            color: 'white'
          }}>
            <strong>{summary.conclusion.text}</strong>{' '}
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '4px 8px',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}>
              {summary.conclusion.highlight}
            </span>
          </div>
        </div>
      )}

    </div>
  );
};

export default ROIAnalysis;
