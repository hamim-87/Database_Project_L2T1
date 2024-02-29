
 import styles from '@/app/schedule/schedule.module.css';

function schedulePage(){
  const stations = [
    'Uttara North',
    'Uttara Center',
    'Uttara South',
    'Pallabi',
    'Mirpur 11',
    'Mirpur 10',
    'Kazipara',
    'Shewrapara',
    'Agargaon',
    'Bijoy Sarani',
    'Farmgate',
    'Karwan Bazar',
    'Shahbagh',
    'Dhaka University',
    'Bangladesh Secretariat',
  ];

  // Render the stations
  const renderStations = () => {
    return stations.map((station, index) => (
        <div
          key={index}
          className={styles.station}
          data-distance="5 km" // Example distance (adjust as needed)
        >
          {station}
        </div>
      ));
  };

  return (
    <div className={styles.transportMap}>
      <div className={styles.route}>{renderStations()}</div>
      {/* You can add distance markers or other visual elements here */}
    </div>
  );
}

export default schedulePage;

