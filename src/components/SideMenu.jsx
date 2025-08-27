import React from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../utils/auth";

function SideMenu({ isOpen, onClose }) {
    const navigate = useNavigate();
    const user = getUser();

    const styles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
            transition: "opacity 0.3s ease, visibility 0.3s ease",
            zIndex: 9999,
        },
        menu: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "75vw",
            maxWidth: "300px",
            minWidth: "260px",
            height: "100%", // Respect parent container and safe areas
            backgroundColor: "#ffffff",
            boxShadow: "2px 0 20px rgba(0, 0, 0, 0.1)",
            transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "env(safe-area-inset-bottom, 20px)", // Handle iOS safe areas
        },
        header: {
            padding: "20px 16px 16px 16px",
            borderBottom: "1px solid #e5e7eb",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            position: "sticky",
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "70px",
            zIndex: 1,
            flexShrink: 0,
        },
        logoContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            minWidth: 0,
        },
        closeBtn: {
            background: "rgba(255, 255, 255, 0.15)",
            border: "none",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            fontSize: "18px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            flexShrink: 0,
            WebkitTapHighlightColor: "transparent",
        },
        menuContent: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflowY: "auto",
        },
        menuItemsContainer: {
            padding: "4px 0",
            display: "flex",
            flexDirection: "column",
            flexGrow: 0, // Prevent excessive stretching
        },
        menuItem: {
            display: "flex",
            alignItems: "center",
            padding: "12px 20px",
            color: "#374151",
            background: "transparent",
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            textAlign: "left",
            gap: "14px",
            position: "relative",
            minHeight: "48px",
            WebkitTapHighlightColor: "transparent",
        },
        logoutContainer: {
            borderTop: "1px solid #f3f4f6",
            background: "#ffffff", // Removed debugging background
            flexShrink: 0,
            padding: "16px 0",
            position: "sticky",
            bottom: "env(safe-area-inset-bottom, 0px)", // Stick to bottom
            zIndex: 2,
        },
        logoutItem: {
            display: "flex",
            alignItems: "center",
            padding: "16px 20px",
            color: "#dc2626",
            background: "transparent",
            border: "none", // Removed debugging border
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            textAlign: "left",
            gap: "14px",
            minHeight: "48px",
            width: "100%",
            zIndex: 3,
        },
        divider: {
            height: "1px",
            background: "#f3f4f6",
            margin: "2px 20px",
        },
        activeBorder: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "0px",
            background: "#667eea",
            transition: "width 0.2s ease",
        },
        logoutBorder: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "0px",
            background: "#dc2626",
            transition: "width 0.2s ease",
        },
    };

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            clearAuth();
            onClose();
            window.location.reload();
        }
    };

    const menuItems = [
        { path: "/user/", icon: "🏠", label: "Home" },
        { path: "/user/profile", icon: "👤", label: "Profile" },
        { path: "/user/wallet", icon: "💰", label: "Wallet" },
        { path: "/user/redeem", icon: "🎁", label: "Redemption" },
    ];

    const adminMenuItems = [
        { path: "/admin/", icon: "👥", label: "Users" },
        { path: "/admin/redeemreq", icon: "📋", label: "Redemption Requests" },
        { path: "/admin/manageAds", icon: "➕", label: "Manage Ads" },
        { path: "/admin/manageOffers", icon: "🛍️", label: "Manage Offers" },
        { path: "/admin/liveCoupons", icon: "🎟️", label: "Manage Coupons" },
        { path: "/admin/profile", icon: "👤", label: "Profile" },
    ];

    const itemsToShow = user?.role === "admin" ? adminMenuItems : menuItems;

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
        } else {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        };
    }, [isOpen]);

    return (
        <>
            <div style={styles.overlay} onClick={onClose} />
            <div style={styles.menu}>
                <div style={styles.header}>
                    <div style={styles.logoContainer}>
                        <p>Puppy Digital Mart</p>
                    </div>
                    <button style={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                <div style={styles.menuContent}>
                    <div style={styles.menuItemsContainer}>
                        {itemsToShow.map((item, index) => (
                            <React.Fragment key={item.path}>
                                <button style={styles.menuItem} onClick={() => handleNavigate(item.path)}>
                                    <div style={styles.activeBorder}></div>
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                                {index < itemsToShow.length - 1 && <div style={styles.divider} />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div style={styles.logoutContainer}>
                        <button style={styles.logoutItem} onClick={handleLogout}>
                            <div style={styles.logoutBorder}></div>
                            <span>🚪</span>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideMenu;