import React from 'react';
import { FunctionComponent } from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({
    children,
}: LayoutProps): ReactElement => {
    return (
        <div className="w-full h-screen bg-purple-800 text-white">
            <main>{children}</main>
        </div>
    );
};

export default Layout;
