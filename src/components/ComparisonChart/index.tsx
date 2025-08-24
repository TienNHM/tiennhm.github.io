import React from 'react';

interface ComparisonItem {
  icon: string;
  value: string;
  label: string;
  subtitle?: string;
  improvement?: string;
}

interface ComparisonSection {
  title: string;
  subtitle?: string;
  items: ComparisonItem[];
  gradient: string;
  shadowColor: string;
  borderColor: string;
}

interface ComparisonChartProps {
  title: string;
  subtitle?: string;
  traditional: ComparisonSection;
  aifirst: ComparisonSection;
  conclusion?: {
    text: string;
    highlight?: string;
    improvement?: string;
  };
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  title,
  subtitle,
  traditional,
  aifirst,
  conclusion
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      padding: '25px',
      background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
      borderRadius: '15px',
      border: '1px solid #dee2e6',
      margin: '20px 0'
    }}>

      <h5 style={{textAlign: 'center', marginBottom: '25px', color: '#495057'}}>
        {title}
      </h5>
      
      {subtitle && (
        <p style={{textAlign: 'center', color: '#6c757d', fontSize: '14px', margin: '0 0 20px 0'}}>
          {subtitle}
        </p>
      )}

      <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>

        {/* Traditional Section */}
        <div style={{
          background: traditional.gradient,
          padding: '25px',
          borderRadius: '12px',
          border: `2px solid ${traditional.borderColor}`
        }}>
          <h6 style={{color: '#d32f2f', marginBottom: '20px', textAlign: 'center'}}>
            {traditional.title}
          </h6>
          {traditional.subtitle && (
            <p style={{textAlign: 'center', fontSize: '12px', opacity: 0.8, margin: '0 0 15px 0'}}>
              {traditional.subtitle}
            </p>
          )}
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px'}}>
            {traditional.items.map((item, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(135deg, #f44336, #d32f2f)',
                  color: 'white',
                  padding: '18px 22px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  minWidth: '160px',
                  boxShadow: traditional.shadowColor
                }}
              >
                <div style={{fontSize: '24px', marginBottom: '8px'}}>{item.icon}</div>
                <div style={{fontSize: '18px', fontWeight: 'bold'}}>{item.value}</div>
                <div style={{fontSize: '12px', opacity: '0.9', marginTop: '5px'}}>{item.label}</div>
                {item.subtitle && (
                  <div style={{
                    fontSize: '10px', 
                    marginTop: '5px', 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '3px 8px', 
                    borderRadius: '6px'
                  }}>
                    {item.subtitle}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* VS Arrow */}
        <div style={{
          textAlign: 'center',
          fontSize: '20px',
          padding: '15px',
          background: 'linear-gradient(135deg, #6c757d, #495057)',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          ⚔️ <strong>SO SÁNH</strong> ⚔️<br/>
          <small style={{fontSize: '14px', opacity: '0.8'}}>Traditional vs AI-First Development</small>
        </div>

        {/* AI-First Section */}
        <div style={{
          background: aifirst.gradient,
          padding: '25px',
          borderRadius: '12px',
          border: `2px solid ${aifirst.borderColor}`
        }}>
          <h6 style={{color: '#2e7d32', marginBottom: '20px', textAlign: 'center'}}>
            {aifirst.title}
          </h6>
          {aifirst.subtitle && (
            <p style={{textAlign: 'center', fontSize: '12px', opacity: 0.8, margin: '0 0 15px 0'}}>
              {aifirst.subtitle}
            </p>
          )}
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px'}}>
            {aifirst.items.map((item, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${['#4caf50', '#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9', '#dcedc8'][index] || '#4caf50'}, ${['#2e7d32', '#388e3c', '#4caf50', '#66bb6a', '#81c784', '#aed581'][index] || '#2e7d32'})`,
                  color: 'white',
                  padding: '18px 22px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  minWidth: '160px',
                  boxShadow: aifirst.shadowColor,
                  border: '2px solid #fff'
                }}
              >
                <div style={{fontSize: '24px', marginBottom: '8px'}}>{item.icon}</div>
                <div style={{fontSize: '18px', fontWeight: 'bold'}}>{item.value}</div>
                <div style={{fontSize: '12px', opacity: '0.9', marginTop: '5px'}}>{item.label}</div>
                {item.improvement && (
                  <div style={{
                    fontSize: '10px', 
                    marginTop: '5px', 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '3px 8px', 
                    borderRadius: '6px'
                  }}>
                    {item.improvement}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Conclusion */}
      {conclusion && (
        <div style={{
          textAlign: 'center',
          padding: '18px',
          background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
          borderRadius: '10px',
          marginTop: '20px',
          color: 'white'
        }}>
          <strong>{conclusion.text}</strong>
          {conclusion.highlight && (
            <>
              {' '}
              <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>{conclusion.highlight}</span>
            </>
          )}
          {conclusion.improvement && (
            <>
              <br/>
              <small style={{fontSize: '14px', opacity: '0.9', marginTop: '5px', display: 'block'}}>
                {conclusion.improvement}
              </small>
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default ComparisonChart;
