import { FC, ReactNode } from 'react';
import LayoutSite from '@/appPages/site/components/layout/LayoutSite';



const Layout: FC<Children> = ({ children }) => {
	return <LayoutSite>{children}</LayoutSite>;
};
export default Layout;
