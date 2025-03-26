import { ReactNode } from "react";
import "./stylesDashboard.scss";

interface DashboardProps {
    title: string;
    count: number;
    color: string;
    icon?: ReactNode;
}

export default function DashboardCard({ title, count, color, icon }: DashboardProps) {
  return (
    <div className={`card ${color}`}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <h4>{count}</h4>
    </div>
  );
}
