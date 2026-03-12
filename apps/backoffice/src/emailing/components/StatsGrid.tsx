import { css } from "../../../styled-system/css";

type StatsGridProps = {
  stats: {
    ovh: { count: number; name: string };
    db: { contactsCount: number; unsubscribesCount: number };
  };
  isLoading: boolean;
};

export const StatsGrid = ({ stats, isLoading }: StatsGridProps) => {
  return (
    <div className={statsGridStyle}>
      <div className={statCardStyle}>
        <div className={statLabelStyle}>Abonnés OVH ({stats.ovh.name})</div>
        <div className={statValueStyle}>{isLoading ? "..." : stats.ovh.count}</div>
      </div>
      <div className={statCardStyle}>
        <div className={statLabelStyle}>Contacts (Base Locale)</div>
        <div className={statValueStyle}>{isLoading ? "..." : stats.db.contactsCount}</div>
      </div>
      <div className={statCardStyle}>
        <div className={statLabelStyle}>Désinscriptions</div>
        <div className={statValueStyle}>{isLoading ? "..." : stats.db.unsubscribesCount}</div>
      </div>
    </div>
  );
};

const statsGridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "1.5rem",
});

const statCardStyle = css({
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  padding: "1.5rem",
  borderRadius: "16px",
  textAlign: "left",
});

const statLabelStyle = css({
  color: "amcoeurPale",
  fontSize: "xs",
  marginBottom: "0.25rem",
  textTransform: "uppercase",
  letterSpacing: "wider",
});

const statValueStyle = css({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "white",
});
