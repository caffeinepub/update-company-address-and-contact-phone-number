# Build Notes

## Deployment Fix - February 8, 2026

### Root Cause
The previous deployment failed due to unused imports and variables in `frontend/src/App.tsx`:
- Unused import: `QueryClient` and `QueryClientProvider` from `@tanstack/react-query`
- Unused variable: `queryClient` instance

The app is already wrapped with `QueryClientProvider` in `frontend/src/main.tsx`, making these imports redundant and causing TypeScript/ESLint strict checks to fail during the build process.

### Resolution
- Removed unused `QueryClient` and `QueryClientProvider` imports from `App.tsx`
- Removed unused `queryClient` constant declaration
- The app now builds successfully with all strict checks passing

### Additional Changes
- Updated "Countries Served" stat from 50+ to 10+ in the About section as requested
