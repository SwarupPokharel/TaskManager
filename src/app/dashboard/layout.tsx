import React from "react";
import type { Metadata } from "next";
import Sidenav from "../components/sidenav/page";
import DashboardNavbar from './components/navbar/DashboardNavbar';
import './layoutStyle.scss';

export const metadata: Metadata = {
    title: "Dashboard",
    description: "User Dashboard",
};
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <div className="dashboardLayout">
            <aside>
                <Sidenav />
            </aside>
            <main className="dashboardMain">
                <nav>
                    <DashboardNavbar />
                </nav>
                <div className="children">
                    {children}
                </div>
            </main>
        </div>
    );
}