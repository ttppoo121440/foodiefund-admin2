import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingOverlayProvider } from './utils/providers/LoadingContext';
import { Toaster } from './components/ui/toaster';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <LoadingOverlayProvider>
        <Toaster />
        <App />
      </LoadingOverlayProvider>
    </QueryClientProvider>
  </ThemeProvider>,
);
