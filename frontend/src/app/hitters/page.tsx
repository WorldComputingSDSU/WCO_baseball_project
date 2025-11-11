import Sidebar from "@/components/Sidebar";
import styles from "./hitter_page.module.css";

export default function HittersPage() {
  return (
    <div className={`page-container ${styles.pageContainer}`}>
      <div className={`content-section ${styles.contentSection}`}>
        <div className={styles.sidebarWrapper}>
          <Sidebar />
        </div>
        <div className={`content-container ${styles.contentContainer}`}>
          <h1 className="hero-title">Hitters</h1>
          <p className="content-description">
            View and analyze hitter performance statistics and metrics.
          </p>
          
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-number">Coming Soon</h3>
              <p className="stat-label">Hitter profiles and analytics will be available here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
