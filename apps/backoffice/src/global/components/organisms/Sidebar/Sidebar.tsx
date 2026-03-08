import { useState } from "react";
import { css, cx } from "../../../../../styled-system/css";
import AmcoeurLogo from "../../../assets/icons/amcoeur_logo_light.webp";
import Link from "../../atoms/Link/Link";
import { 
  LayoutDashboard, 
  FileText, 
  ClipboardList, 
  Heart, 
  Mail, 
  Users,
  LogOut,
  Menu
} from "lucide-react";
import { useLocation } from "react-router-dom";

type SidebarProps = {
  isUserInactive?: boolean;
  isUserAdmin?: boolean;
  logout?: () => void;
};

function Sidebar({ isUserInactive = true, isUserAdmin = false, logout }: SidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isUserInactive) return null;

  const links = [
    { name: "Tableau de bord", href: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Gestion des pages", href: "/pages", icon: <FileText size={20} /> },
    { name: "Formulaires", href: "/formulaires", icon: <ClipboardList size={20} /> },
    { name: "Adoptions", href: "/adoptions", icon: <Heart size={20} /> },
  ];

  if (isUserAdmin) {
    links.push({ name: "Emailing", href: "/emailing", icon: <Mail size={20} /> });
    links.push({ name: "Utilisateurs", href: "/users", icon: <Users size={20} /> });
  }

  return (
    <aside className={cx(sidebarStyle, isCollapsed ? collapsedSidebarStyle : expandedSidebarStyle)}>
      <div className={logoSectionStyle}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className={burgerButtonStyle}
          title={isCollapsed ? "Développer" : "Réduire"}
        >
          <Menu size={24} />
        </button>
        {!isCollapsed && (
          <img src={AmcoeurLogo} alt="Logo Amcoeur" className={logoStyle} />
        )}
      </div>

      <nav className={navStyle}>
        {links.map((link) => (
          <Link 
            key={link.href} 
            to={link.href} 
            variant="sidebar" 
            icon={link.icon}
            isActive={location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href))}
            className={cx(isCollapsed && collapsedLinkStyle)}
          >
            {!isCollapsed && link.name}
          </Link>
        ))}
        
        <div className={logoutWrapperStyle}>
          <Link 
            onClick={logout} 
            variant="sidebar" 
            icon={<LogOut size={20} />}
            className={cx(isCollapsed && collapsedLinkStyle)}
          >
            {!isCollapsed && "Déconnexion"}
          </Link>
        </div>
      </nav>
    </aside>
  );
}

const sidebarStyle = css({
  height: "100vh",
  backgroundColor: "bg.sidebar",
  borderRight: "2px solid",
  borderColor: "amcoeurRose",
  display: "flex",
  flexDirection: "column",
  position: "sticky",
  top: 0,
  transition: "width 0.3s ease-in-out",
  zIndex: 100,
  overflow: "hidden",
  flexShrink: 0,
});

const expandedSidebarStyle = css({
  width: "260px",
});

const collapsedSidebarStyle = css({
  width: "80px",
});

const logoSectionStyle = css({
  padding: "0 1.5rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  height: "80px",
  flexShrink: 0,
});

const burgerButtonStyle = css({
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.05)",
  },
});

const logoStyle = css({
  width: "35px",
  height: "35px",
  objectFit: "contain",
});

const navStyle = css({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "0 1rem 1.5rem 1rem",
  overflowY: "auto",
  overflowX: "hidden",
});

const collapsedLinkStyle = css({
  padding: "0.8rem 0!",
  justifyContent: "center!",
  "& span": {
    marginRight: "0!", // Supprime la marge de l'icône quand réduit
  }
});

const logoutWrapperStyle = css({
  marginTop: "auto",
  paddingTop: "1.5rem",
  borderTop: "1px solid rgba(255,255,255,0.05)",
});

export default Sidebar;
