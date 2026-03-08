import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

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
  Menu,
  Contact2
} from "lucide-react";
import { useCurrentUser } from "../../../hooks/useUser";
import { checkUserPermissions } from "../../../utils/user";
import { UserRole } from "@amcoeur/types";

type SidebarProps = {
  isUserInactive?: boolean;
  isUserAdmin?: boolean;
  logout?: () => void;
};

function Sidebar({ isUserInactive = true, logout }: SidebarProps) {
  const { data: { data: currentUser } = {} } = useCurrentUser();
  const location = useLocation();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [isCollapsed, setIsCollapsed] = useState(!isLargeScreen);

  useEffect(() => {
    setIsCollapsed(!isLargeScreen);
  }, [isLargeScreen]);

  if (isUserInactive || !currentUser) return null;

  const isAdmin = checkUserPermissions(currentUser, [UserRole.ADMIN]);

  const links = [
    { name: "Tableau de bord", href: "/", icon: <LayoutDashboard size={20} />, show: true },
    { 
      name: "Gestion des pages", 
      href: "/pages", 
      icon: <FileText size={20} />, 
      show: isAdmin || checkUserPermissions(currentUser, [UserRole.WEBSITE_EDITOR, UserRole.PAGES]) 
    },
    { 
      name: "Formulaires", 
      href: "/formulaires", 
      icon: <ClipboardList size={20} />, 
      show: isAdmin || checkUserPermissions(currentUser, [UserRole.WEBSITE_EDITOR, UserRole.FORMS]) 
    },
    { 
      name: "Adoptions", 
      href: "/adoptions", 
      icon: <Heart size={20} />, 
      show: isAdmin || checkUserPermissions(currentUser, [UserRole.ADOPTION_MANAGER]) 
    },
    { 
      name: "Contacts", 
      href: "/contacts", 
      icon: <Contact2 size={20} />, 
      show: isAdmin || checkUserPermissions(currentUser, [UserRole.CONTACT_MANAGER]) 
    },
    { 
      name: "Emailing", 
      href: "/emailing", 
      icon: <Mail size={20} />, 
      show: isAdmin || checkUserPermissions(currentUser, [UserRole.EMAILING_MANAGER]) 
    },
    { 
      name: "Utilisateurs", 
      href: "/users", 
      icon: <Users size={20} />, 
      show: isAdmin 
    },
  ];

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
        {links.filter(link => link.show).map((link) => (
          <Link 
            key={link.href} 
            to={link.href} 
            variant="sidebar" 
            icon={link.icon}
            isActive={location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href))}
            className={cx(isCollapsed && collapsedLinkStyle)}
          >
            {!isCollapsed && <span className={textStyle}>{link.name}</span>}
          </Link>
        ))}
        
        <div className={logoutWrapperStyle}>
          <Link 
            onClick={logout} 
            variant="sidebar" 
            icon={<LogOut size={20} />}
            className={cx(isCollapsed && collapsedLinkStyle)}
          >
            {!isCollapsed && <span className={textStyle}>Déconnexion</span>}
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
  height: "120px",
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
  width: "90px",
  height: "90px",
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
    marginRight: "0!",
  }
});

const logoutWrapperStyle = css({
  marginTop: "auto",
  paddingTop: "1.5rem",
  borderTop: "1px solid rgba(255,255,255,0.05)",
});

const textStyle = css({
  marginLeft: "0.25rem",
});

export default Sidebar;
