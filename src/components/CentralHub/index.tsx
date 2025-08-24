import React from 'react';

interface FloatingElement {
  icon: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: string;
  opacity: number;
}

interface CentralHubProps {
  title: string;
  subtitle?: string;
  centerIcon: string;
  centerTitle: string;
  centerSubtitle: string;
  centerBadge: string;
  floatingElements?: FloatingElement[];
  backgroundGradient?: string;
  centerGradient?: string;
}

const CentralHub: React.FC<CentralHubProps> = ({
  title,
  subtitle,
  centerIcon,
  centerTitle,
  centerSubtitle,
  centerBadge,
  floatingElements = [
    { icon: '✨', position: { top: '10px', right: '30px' }, size: '20px', opacity: 0.7 },
    { icon: '💫', position: { bottom: '15px', left: '25px' }, size: '16px', opacity: 0.6 },
    { icon: '⚡', position: { top: '50px', left: '10px' }, size: '14px', opacity: 0.5 },
    { icon: '🌟', position: { bottom: '45px', right: '20px' }, size: '18px', opacity: 0.8 }
  ],
  backgroundGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  centerGradient = 'linear-gradient(135deg, #ff4757 0%, #ff6348 50%, #ff3838 100%)'
}) => {
  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        padding: '30px',
        background: backgroundGradient,
        borderRadius: '20px',
        margin: '25px 0',
        color: 'white'
      }}>

        <h4 style={{
          textAlign: 'center', 
          marginBottom: '25px', 
          fontSize: '26px', 
          fontWeight: 'bold',
          color: '#ffffff',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
          padding: '15px 25px',
          borderRadius: '16px',
          border: '2px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          letterSpacing: '0.5px'
        }}>
          {title}
        </h4>

        {/* Central Hub - WOW Design */}
        <div style={{
          position: 'relative',
          width: '280px',
          height: '280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Outer Glow Ring */}
          <div style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #ff6b6b, #ffa726, #42a5f5, #ab47bc, #26c6da, #ff6b6b)',
            padding: '4px',
            boxShadow: '0 0 30px rgba(255,107,107,0.6), 0 0 60px rgba(255,167,38,0.4)',
            animation: 'spin 10s linear infinite'
          }}>
            {/* Middle Ring */}
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              padding: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* Inner Core */}
              <div style={{
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                background: centerGradient,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2), 0 10px 40px rgba(0,0,0,0.4)',
                border: '3px solid rgba(255,255,255,0.8)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Shine Effect */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
                  opacity: 0.8
                }}></div>
                
                {/* Content */}
                <div style={{position: 'relative', zIndex: 2}}>
                  <div style={{
                    fontSize: '56px', 
                    marginBottom: '8px', 
                    textShadow: '0 0 20px rgba(255,255,255,0.8), 2px 2px 4px rgba(0,0,0,0.3)',
                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
                  }}>{centerIcon}</div>
                  <div style={{
                    fontSize: '28px', 
                    fontWeight: '900', 
                    color: '#fff', 
                    textShadow: '2px 2px 6px rgba(0,0,0,0.7)', 
                    letterSpacing: '2px',
                    marginBottom: '2px',
                    background: 'linear-gradient(45deg, #fff, #ffeb3b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>{centerTitle}</div>
                  <div style={{
                    fontSize: '16px', 
                    color: '#fff', 
                    textShadow: '1px 1px 4px rgba(0,0,0,0.8)', 
                    marginBottom: '10px',
                    opacity: 0.95,
                    fontWeight: 'bold'
                  }}>{centerSubtitle}</div>
                  <div style={{
                    fontSize: '12px',
                    color: '#1a1a1a',
                    background: 'linear-gradient(135deg, #fff, #f0f0f0)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)',
                    border: '1px solid rgba(255,255,255,0.5)'
                  }}>{centerBadge}</div>
                </div>
                
                {/* Bottom Highlight */}
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  width: '80%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  borderRadius: '2px'
                }}></div>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          {floatingElements.map((element, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                ...element.position,
                fontSize: element.size,
                opacity: element.opacity
              }}
            >
              {element.icon}
            </div>
          ))}
        </div>

        {subtitle && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #ff9800, #f57c00)',
            borderRadius: '12px',
            maxWidth: '600px',
            boxShadow: '0 6px 15px rgba(255,152,0,0.3)',
            border: '2px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{fontSize: '20px', marginBottom: '8px'}}>🌟</div>
            <div style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '8px'}}>Global AI-DD Success</div>
            <div style={{fontSize: '14px', opacity: '0.9', lineHeight: '1.4'}}>
              {subtitle}
            </div>
          </div>
        )}

      </div>

      <style>
      {`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      `}
      </style>
    </>
  );
};

export default CentralHub;
