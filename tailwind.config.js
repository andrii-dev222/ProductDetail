module.exports = {
  // ... other config
  theme: {
    extend: {
      keyframes: {
        'loading-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        }
      },
      animation: {
        'loading-bar': 'loading-bar 1.5s ease-in-out infinite'
      }
    }
  }
}