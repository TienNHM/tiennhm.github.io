# Component Usage Examples

## 1. ChartCard - Replace Simple Data Cards

### Before (Duplicate HTML/CSS):
```html
<div style={{background: 'gradient...', padding: '25px'...}}>
  <div style={{icon, value, label...}}>🚀 88% devs tăng năng suất</div>
  <div style={{icon, value, label...}}>⏰ 55% giảm thời gian</div>
</div>
```

### After (Reusable Component):
```tsx
import ChartCard from '@site/src/components/ChartCard';

<ChartCard
  title="📈 GitHub Copilot Research (2024)"
  gradient="linear-gradient(135deg, #2196f3, #1976d2)"
  shadowColor="rgba(33,150,243,0.3)"
  items={[
    { 
      icon: '🚀', 
      value: '88%', 
      label: 'Developers',
      details: ['3-5x Năng Suất', 'tăng productivity'],
      gradient: 'linear-gradient(135deg, #28a745, #20c997)'
    },
    { 
      icon: '⏰', 
      value: '55%', 
      label: 'Faster Development',
      details: ['Time to Market', 'Feature Delivery'],
      gradient: 'linear-gradient(135deg, #007bff, #0056b3)'
    },
    { 
      icon: '⭐', 
      value: '46%', 
      label: 'Quality Reports',
      details: ['Higher Code Quality', 'Better Standards', 'Reduced Bugs']
    }
  ]}
/>
```

## 2. ComparisonChart - Replace Traditional vs AI-First

### Before (200+ lines HTML/CSS):
```html
<div>Traditional Section with 6 cards...</div>
<div>VS Arrow...</div> 
<div>AI-First Section with 6 cards...</div>
<div>Conclusion...</div>
```

### After (Clean Component):
```tsx
import ComparisonChart from '@site/src/components/ComparisonChart';

<ComparisonChart
  title="📊 So Sánh Chất Lượng Code: Truyền Thống vs AI-First"
  traditional={{
    title: "🔴 Phương Pháp Truyền Thống",
    gradient: "linear-gradient(135deg, #ffebee, #ffcdd2)",
    shadowColor: "0 4px 8px rgba(244,67,54,0.3)",
    borderColor: "#f44336",
    items: [
      { icon: '📊', value: '70%', label: 'Độ Phủ Code', subtitle: 'Trung bình' },
      { icon: '⭐', value: '87%', label: 'Chất Lượng Code', subtitle: 'Ổn' }
    ]
  }}
  aifirst={{
    title: "🟢 Phương Pháp AI-First (Superior!)",
    gradient: "linear-gradient(135deg, #e8f5e8, #c8e6c9)", 
    shadowColor: "0 4px 8px rgba(76,175,80,0.3)",
    borderColor: "#4caf50",
    items: [
      { icon: '📊', value: '92%', label: 'Độ Phủ Code', improvement: '+31%' },
      { icon: '⭐', value: '95%', label: 'Chất Lượng Code', improvement: '+9%' }
    ]
  }}
  conclusion={{
    text: "📝 Kết Luận: Phương pháp AI-First vượt trội ở",
    highlight: "TẤT CẢ",
    improvement: "Cải thiện trung bình +34% so với phương pháp truyền thống"
  }}
/>
```

## 3. CentralHub - Replace Complex Central Designs

### Before (100+ lines HTML/CSS + Animation):
```html
<div>Title with glass morphism...</div>
<div>3-layer rotating hub...</div>  
<div>Floating elements...</div>
<style>@keyframes...</style>
```

### After (Simple Component):
```tsx
import CentralHub from '@site/src/components/CentralHub';

<CentralHub
  title="🌍 Tổng Quan Toàn Cầu: AI-DD Impact"
  centerIcon="🚀"
  centerTitle="AI-DD"
  centerSubtitle="Global Impact" 
  centerBadge="⭐ 4 Key Studies"
  subtitle="<strong>4 major studies</strong> confirming AI-Driven Development effectiveness"
  backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  centerGradient="linear-gradient(135deg, #ff4757 0%, #ff6348 50%, #ff3838 100%)"
/>
```

## Benefits:

### ✅ **Code Reduction:**
- **Before**: 200+ lines per chart → **After**: 10-15 lines
- **DRY Principle**: No more duplicate HTML/CSS
- **Maintainable**: Change once, update everywhere

### ✅ **Consistency:**
- **Unified styling** across all charts
- **Same hover effects** và animations
- **Responsive design** built-in

### ✅ **Flexibility:** 
- **Props-based** configuration
- **Custom gradients** và colors
- **Special highlighting** options
- **Responsive layouts** (grid/flex)

### ✅ **Performance:**
- **CSS-in-JS** optimized
- **Component reuse** reduces bundle size
- **TypeScript support** với IntelliSense

## Next Steps:

1. **Import components** vào MDX files
2. **Replace existing** HTML/CSS charts
3. **Customize props** theo từng use case  
4. **Add more variants** khi cần thiết

This approach transforms your blog from **hardcoded HTML** to **professional component architecture**! 🚀
