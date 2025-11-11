import Sidebar from "@/components/Sidebar";
import styles from "./hitter_page.module.css";

export default function HittersPage() {
  // sample data for the table
  const hitters = [
    { name: "John Doe", team: "Tigers", avg: ".312", obp: ".395", slg: ".521", ops: ".916", pa: 412 },
    { name: "Alex Smith", team: "Bears", avg: ".287", obp: ".356", slg: ".468", ops: ".824", pa: 389 },
    { name: "Sam Lee", team: "Wolves", avg: ".265", obp: ".338", slg: ".402", ops: ".740", pa: 350 },
  ];

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

          <div className={`table-section ${styles.tableSection}`}>
            {/* responsive wrapper */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Team</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">AVG</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">OBP</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">SLG</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">OPS</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">PA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {hitters.map((hitter) => (
                    <tr key={hitter.name} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{hitter.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{hitter.team}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">{hitter.avg}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">{hitter.obp}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">{hitter.slg}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">{hitter.ops}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700">{hitter.pa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
