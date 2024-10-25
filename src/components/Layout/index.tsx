import { ProviderProps } from '@/types/ProviderType';
import AppSidebar from './AppSidebar';

const Layout = ({ children }: ProviderProps) => {
  return (
    <>
      <AppSidebar>{children}</AppSidebar>
    </>
  );
};

export default Layout;
