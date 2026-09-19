import { AIEstimateResult, BudgetBreakdownItem, MilestoneItem, RiskMatrixItem } from '../types/database';

export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return `₹${cr} Cr`;
  }
  if (amount >= 100000) {
    const l = (amount / 100000).toFixed(2);
    return `₹${l} L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

interface ArchetypeRule {
  keywords: string[];
  archetype: string;
  sector: string;
  domainExplanation: string;
  baseMinINR: number;
  baseExpectedINR: number;
  baseMaxINR: number;
  optimisticMonths: number;
  expectedMonths: number;
  pessimisticMonths: number;
  breakdown: { category: string; pct: number; justification: string }[];
  milestones: { phase: string; title: string; weeks: number; deliverables: string[] }[];
  stack: { edge?: string[]; backend: string[]; frontend: string[]; ai_ml: string[]; cloud: string[] };
  risks: { risk: string; severity: 'Low' | 'Medium' | 'High' | 'Critical'; probability: 'Low' | 'Medium' | 'High'; mitigation: string }[];
  govTags: string[];
}

const ARCHETYPES: ArchetypeRule[] = [
  {
    keywords: ['pothole', 'road', 'highway', 'traffic', 'pavement', 'asphalt', 'transit', 'vehicle', 'smart road'],
    archetype: 'Smart Road & Municipal Infrastructure Sensing',
    sector: 'Infrastructure & Smart Cities',
    domainExplanation: 'Computer vision, accelerometer edge sensors, and municipal GIS dashboard for pavement health monitoring and automated repair routing.',
    baseMinINR: 2800000,
    baseExpectedINR: 4200000,
    baseMaxINR: 6500000,
    optimisticMonths: 5,
    expectedMonths: 8,
    pessimisticMonths: 12,
    breakdown: [
      { category: 'Edge Hardware & Vehicle Dashcam Kits', pct: 28, justification: 'Dashcam mounting units, OBD-II telemetry units, shock sensors, battery enclosures' },
      { category: 'CV & Edge AI Detection Models', pct: 26, justification: 'YOLO-based road distress inference, geo-referencing pipeline, model optimization for mobile chipsets' },
      { category: 'Municipal GIS Cloud Dashboard', pct: 20, justification: 'Municipal ward map integration, repair priority queue, contractor SLA tracking backend' },
      { category: 'Field Calibration & Pilot Operations', pct: 16, justification: 'Fleet onboarding on 40 municipal transit buses across 3 city wards, ground-truth surveys' },
      { category: 'Statutory Safety & Contingency', pct: 10, justification: 'Road safety sensor compliance, thermal vibration testing, contingency reserve' },
    ],
    milestones: [
      { phase: 'Phase 1', title: 'Sensor Kit Prototyping & Edge ML Training', weeks: 8, deliverables: ['Trained road distress CV model (>88% mAP)', 'Vibration sensor calibration rig', 'Firmware v1.0'] },
      { phase: 'Phase 2', title: 'Municipal Fleet Pilot (50 Vehicles)', weeks: 10, deliverables: ['Bus fleet mount deployment', 'Real-time telemetry ingestion pipeline', 'Ward GIS dashboard'] },
      { phase: 'Phase 3', title: 'Automated Contractor Dispatch Integration', weeks: 8, deliverables: ['Work-order ticketing integration with PWD', 'Citizen verification portal', 'Audit log validation'] },
      { phase: 'Phase 4', title: 'City-Wide Scale-Up & SLA Handover', weeks: 6, deliverables: ['Automated quarterly road health index', 'Open API for state transport', 'Operational manual'] },
    ],
    stack: {
      edge: ['Raspberry Pi CM4 / Jetson Orin Nano', 'Sony IMX335 High-Dynamic-Range Sensor', '6-Axis IMU (MPU-6050)', 'Quectel 4G LTE/GNSS Module'],
      backend: ['Node.js / Express', 'PostGIS / PostgreSQL', 'Redis Pub/Sub', 'Kafka stream processor'],
      frontend: ['React 19', 'MapLibre GL / OpenStreetMap', 'Tailwind CSS', 'PWA for municipal field inspectors'],
      ai_ml: ['PyTorch', 'TensorRT Edge Engine', 'YOLOv11 road damage detector', 'Kalman Filter smoothing'],
      cloud: ['NIC MeghRaj Cloud / AWS GovCloud', 'MinIO object storage for photo proofs', 'Docker & Kubernetes'],
    },
    risks: [
      { risk: 'Monsoon lens obstruction and road reflection artifacts', severity: 'High', probability: 'Medium', mitigation: 'Hydrophobic nano-coating on lens enclosures and multi-frame temporal confirmation logic.' },
      { risk: 'Vehicle battery drain during continuous ignition off-cycles', severity: 'Medium', probability: 'Low', mitigation: 'Hardware voltage-monitoring sleep circuit with automatic low-power shutdown.' },
      { risk: 'Delayed repair SLA adherence by local road contractors', severity: 'Medium', probability: 'High', mitigation: 'Automated geo-tagged before/after photo verification with escrow milestone releases.' },
    ],
    govTags: ['Smart Cities Mission', 'MoRTH Road Safety', 'PM Gati Shakti', 'Municipal GIS Standard'],
  },
  {
    keywords: ['water', 'irrigation', 'canal', 'drought', 'pipeline', 'leakage', 'jal', 'groundwater', 'aquifer', 'contamination'],
    archetype: 'Smart Water Grid & Precision Agricultural Irrigation',
    sector: 'Water Resources & Clean Tech',
    domainExplanation: 'IoT-enabled ultrasonic flowmeters, soil moisture capacitive sensors, and canal telemetry with predictive allocation algorithms.',
    baseMinINR: 3500000,
    baseExpectedINR: 5400000,
    baseMaxINR: 8200000,
    optimisticMonths: 6,
    expectedMonths: 9,
    pessimisticMonths: 14,
    breakdown: [
      { category: 'IoT Sub-Surface Sensors & Solar Gate Actuators', pct: 32, justification: 'LoRaWAN soil moisture probes, non-invasive ultrasonic flowmeters, IP68 solar-powered gate valves' },
      { category: 'Satellite & Hydrological Forecasting Engine', pct: 22, justification: 'Sentinel-2 SAR soil moisture fusion, evapotranspiration models, rainfall forecast API integration' },
      { category: 'Telemetry Telecommunications & Gateway Network', pct: 18, justification: 'Sub-GHz LoRa gateways, industrial solar poles with cellular backhaul in rural canal branches' },
      { category: 'Farmer Co-op Training & District Pilot Deployment', pct: 18, justification: 'Pilot across 12 Gram Panchayats, vernacular IVR/WhatsApp alerts, agronomist consultation' },
      { category: 'Central Water Commission Compliance & Contingency', pct: 10, justification: 'ISO 4064 flowmeter certification, cybersecurity hardening for SCADA, buffer reserve' },
    ],
    milestones: [
      { phase: 'Phase 1', title: 'Hardware Validation & LoRa Network Survey', weeks: 10, deliverables: ['IP68 ingress certification', 'RF propagation map for target canals', 'Prototype flow sensor bench test'] },
      { phase: 'Phase 2', title: 'Canal Pilot & Gate Actuation System', weeks: 12, deliverables: ['20 solar-actuated branch gates', 'Sub-GHz telemetry base stations', 'Hydraulic model baseline'] },
      { phase: 'Phase 3', title: 'Predictive Allocation & Farmer Advisory Release', weeks: 8, deliverables: ['Vernacular SMS/Voice broadcast engine', 'Gram Panchayat water accounting app', 'Water saved validation'] },
      { phase: 'Phase 4', title: 'State Water Resource Department Handover', weeks: 6, deliverables: ['Integration with State Jal Jeevan Dashboard', 'Full operations and maintenance training', 'Impact assessment audit'] },
    ],
    stack: {
      edge: ['STM32 Ultra-Low-Power MCU', 'LoRaWAN SX1262 Transceiver', 'Industrial Ultrasonic Flow Sensors', 'Solar MPPT Charger with LiFePO4 Battery'],
      backend: ['Go / Fiber microservices', 'TimescaleDB (Time-series data)', 'RabbitMQ telemetry broker', 'FastAPI simulation service'],
      frontend: ['React 19', 'Chart.js / Highcharts', 'Tailwind CSS', 'Mobile responsive offline-first PWA'],
      ai_ml: ['XGBoost irrigation demand model', 'LSTM aquifer recharge predictor', 'Hydraulic network digital twin'],
      cloud: ['State Data Centre (SDC) / NIC Cloud', 'MQTT Broker (EMQX)', 'Grafana monitoring cluster'],
    },
    risks: [
      { risk: 'Silting and physical debris jamming mechanical sensor probes', severity: 'High', probability: 'Medium', mitigation: 'Deploy non-contact acoustic/ultrasonic transducers with self-cleaning purge cycles.' },
      { risk: 'Cellular network blackouts in remote agricultural corridors', severity: 'Medium', probability: 'High', mitigation: 'Store-and-forward edge memory buffers capable of holding 30 days of offline logs.' },
      { risk: 'Resistance by local water user associations to automated scheduling', severity: 'High', probability: 'Medium', mitigation: 'Include village committee leaders in quota setting and provide clear dispute-resolution mechanisms.' },
    ],
    govTags: ['Jal Jeevan Mission', 'Atal Bhujal Yojana', 'National Water Mission', 'PM Krishi Sinchayee Yojana'],
  },
  {
    keywords: ['solar', 'energy', 'battery', 'inverter', 'grid', 'renewable', 'microgrid', 'cleantech', 'power', 'tribal village', 'electrification'],
    archetype: 'Decentralized Micro-Grid & Renewable Energy Hardware',
    sector: 'Clean Energy & Power',
    domainExplanation: 'High-efficiency bidirectional micro-inverters, smart battery management system (BMS), and remote micro-grid load balancer for off-grid communities.',
    baseMinINR: 4200000,
    baseExpectedINR: 6800000,
    baseMaxINR: 10500000,
    optimisticMonths: 7,
    expectedMonths: 11,
    pessimisticMonths: 16,
    breakdown: [
      { category: 'Power Electronics & Inverter HW Prototyping', pct: 35, justification: 'Silicon carbide (SiC) MOSFETs, high-frequency planar transformers, thermal heat sinks, PCB spin cycles' },
      { category: 'Embedded Firmware & Smart BMS Controller', pct: 20, justification: 'Active cell balancing algorithm, anti-islanding safety protocols, real-time MPPT trackers' },
      { category: 'Grid-Edge Telemetry & Cloud Dispatcher', pct: 15, justification: 'Low-power 4G/NB-IoT microgrid controller, dynamic peak-shaving dispatch algorithm, load telemetry' },
      { category: 'Extreme Thermal & BIS Lab Certifications', pct: 18, justification: 'BIS IS 16221 / IS 16169 safety certifications, climatic chamber endurance tests (-10°C to 55°C)' },
      { category: 'Statutory Testing & Deployment Reserve', pct: 12, justification: 'Tribal hamlet field trials, installer training workshops, supply-chain buffer' },
    ],
    milestones: [
      { phase: 'Phase 1', title: 'Power Stage Design & Thermal Simulation', weeks: 12, deliverables: ['98% peak efficiency demonstrated on test bench', 'PCB revision 2 fabricated', 'SiC thermal model validated'] },
      { phase: 'Phase 2', title: 'Firmware Safety & Anti-Islanding Compliance', weeks: 10, deliverables: ['Anti-islanding test pass (IEEE 1547 compliant)', 'State of Charge (SoC) estimation <2% error', 'OTA firmware bootloader'] },
      { phase: 'Phase 3', title: 'BIS Certification & Village Microgrid Pilot', weeks: 14, deliverables: ['BIS lab safety certificate', 'Installation in 2 tribal hamlets (40 households)', 'Uninterrupted 60-day uptime audit'] },
      { phase: 'Phase 4', title: 'Commercialization & DISCOM Grid Tie-In', weeks: 8, deliverables: ['DISCOM net-metering interface validation', 'Vendor supply agreement', 'Mass manufacturing DFM package'] },
    ],
    stack: {
      edge: ['TI C2000 Real-Time Digital Signal Controller', 'SiC Gate Drivers', 'CAN bus / Modbus RTU interface', 'Industrial isolated RS485 transceiver'],
      backend: ['Rust / Tokio high-frequency telemetry daemon', 'PostgreSQL with TimescaleDB', 'MQTT cluster'],
      frontend: ['React 19', 'Tailwind CSS', 'Technician mobile diagnostics app (BLE connected)'],
      ai_ml: ['Solar irradiance forecast network', 'Battery degradation regression model', 'Dynamic load shedder'],
      cloud: ['NIC MeghRaj Cloud / AWS', 'Prometheus & Grafana', 'Automated alert webhook manager'],
    },
    risks: [
      { risk: 'Component lead time volatility for specialty SiC power semiconductors', severity: 'High', probability: 'High', mitigation: 'Dual-source schematic layout accommodating both Wolfspeed and STMicroelectronics footprints.' },
      { risk: 'Lightning surge induced failure in exposed mountain/tribal hamlets', severity: 'Critical', probability: 'Medium', mitigation: 'Three-stage surge protection devices (SPDs) rated up to 40kA with isolated ground planes.' },
      { risk: 'Thermal throttling under sustained 50°C summer ambients', severity: 'High', probability: 'Medium', mitigation: 'Passive heat pipe convection chassis with IP65 anodized extruded aluminum fins.' },
    ],
    govTags: ['PM-KUSUM Scheme', 'MNRE Rooftop Solar', 'National Green Hydrogen Mission', 'Tribal Electrification Initiative'],
  },
  {
    keywords: ['retinal', 'health', 'clinic', 'medical', 'phc', 'diabetic', 'doctor', 'telehealth', 'telemedicine', 'diagnostic', 'patient', 'hospital'],
    archetype: 'Edge AI Point-of-Care Diagnostic Medical Device',
    sector: 'Healthcare & MedTech',
    domainExplanation: 'Handheld fundus/diagnostic optical device with on-device edge neural network for zero-latency triage at rural Primary Health Centres (PHCs).',
    baseMinINR: 4800000,
    baseExpectedINR: 7500000,
    baseMaxINR: 11800000,
    optimisticMonths: 8,
    expectedMonths: 12,
    pessimisticMonths: 18,
    breakdown: [
      { category: 'Optical & Precision Mechanical Engineering', pct: 28, justification: 'Split-path LED illuminator, custom aspheric lens assembly, ergonomic medical-grade ABS casing' },
      { category: 'Edge AI Inference Pipeline & Quantization', pct: 24, justification: 'Int8 quantized CNN deployment on NPU accelerator, microaneurysm detection, artifacts filtering' },
      { category: 'CDSCO Regulatory Compliance & Clinical Trials', pct: 22, justification: 'Clinical validation against dilated fundus photography across 500 patients, CDSCO Class B device filing' },
      { category: 'PHC Tele-Medicine & ABDM / ABHA Cloud Sync', pct: 16, justification: 'Ayushman Bharat Digital Mission (ABDM) sandbox compliance, FHIR record bridge, offline sync' },
      { category: 'Quality Management (ISO 13485) & Buffer', pct: 10, justification: 'Biocompatibility testing, optical safety (ISO 15004-2), contingency budget' },
    ],
    milestones: [
      { phase: 'Phase 1', title: 'Optical Bench Model & Initial AI Architecture', weeks: 12, deliverables: ['Non-mydriatic optical design verified', 'CNN validation on public EyePACS dataset (>92% sensitivity)', 'Form-factor prototype'] },
      { phase: 'Phase 2', title: 'Edge Hardware Integration & ISO 13485 QMS', weeks: 14, deliverables: ['NPU edge inference latency <1.8 seconds', 'IEC 60601-1 electrical safety pass', 'QMS SOP documentation'] },
      { phase: 'Phase 3', title: 'Clinical Validation Study at Medical College', weeks: 16, deliverables: ['Multi-centric 500-patient trial complete', 'Peer-reviewed clinical validation report', 'CDSCO submission dossier'] },
      { phase: 'Phase 4', title: 'District Health Mission PHC Rollout', weeks: 8, deliverables: ['Deployment across 25 Primary Health Centres', 'Training of 60 ASHA/nursing staff', 'Live ABDM health ID linking'] },
    ],
    stack: {
      edge: ['Custom NPU SoC (Qualcomm / NXP i.MX8M Plus)', 'Sony Pregius Global Shutter Optical Sensor', 'Integrated OLED Triage Display', 'Medical-grade battery pack'],
      backend: ['Python FastAPI with FHIR standard compliance', 'PostgreSQL (encrypted at rest)', 'ABDM Gateway Adapter'],
      frontend: ['Flutter / React Native companion app for ASHA workers', 'Web-based ophthalmologist tele-triage viewer'],
      ai_ml: ['EfficientNet-B4 / MobileNetV3 quantized via ONNX Runtime', 'Explainability heatmap (Grad-CAM) layer', 'Image quality gatekeeper model'],
      cloud: ['NIC MeghRaj Cloud / CDAC Medical Cloud', 'Encrypted DICOM object storage (S3 compliant)', 'Audit logging daemon'],
    },
    risks: [
      { risk: 'Clinical false negative rate exceeding permissible diagnostic thresholds', severity: 'Critical', probability: 'Low', mitigation: 'Conservative triage threshold tuning biasing towards referral when image confidence is border-line.' },
      { risk: 'Regulatory clearance delays through state CDSCO medical licensing', severity: 'High', probability: 'High', mitigation: 'Engage authorized regulatory consultancy early; prepare comprehensive design dossier in sprint 1.' },
      { risk: 'Inadequate training among rural front-line healthcare workers', severity: 'Medium', probability: 'Medium', mitigation: 'Voice-guided automated pupil alignment assistant directly embedded into device firmware.' },
    ],
    govTags: ['Ayushman Bharat Digital Mission (ABDM)', 'National Health Mission', 'Make in India MedTech', 'CDSCO Medical Device Rules'],
  },
  {
    keywords: ['cotton', 'pest', 'bollworm', 'crop', 'agriculture', 'soil', 'pesticide', 'farming', 'fertilizer', 'farmer', 'krishi'],
    archetype: 'AI Agricultural Pest Forewarning & Field Diagnostic System',
    sector: 'Agriculture & Rural Development',
    domainExplanation: 'Smartphone & edge trap-camera imagery analysis with pheromone sensor telemetry to predict pest cycles before visual crop damage occurs.',
    baseMinINR: 2400000,
    baseExpectedINR: 3800000,
    baseMaxINR: 5900000,
    optimisticMonths: 5,
    expectedMonths: 7,
    pessimisticMonths: 11,
    breakdown: [
      { category: 'Autonomous Smart Pheromone Trap Hardware', pct: 28, justification: 'Solar-powered smart trap chamber, macro lens camera, sticky grid counter, anti-clogging filter' },
      { category: 'Pest Identification AI & Infestation Forecast Model', pct: 25, justification: 'Pink bollworm / fall armyworm classification model, weather-correlated population dynamics simulator' },
      { category: 'Vernacular Advisory Application & SMS Gateway', pct: 20, justification: 'Multi-lingual voice bot (Hindi, Marathi, Gujarati, Telugu), Krishi Vigyan Kendra (KVK) dashboard' },
      { category: 'District Agricultural University Trials', pct: 17, justification: 'Validation trials across 6 agro-climatic zones with state agricultural universities, ground entomology audits' },
      { category: 'Field Logistics & Contingency Reserve', pct: 10, justification: 'Solar battery replacements, pheromone lure replenishment, project buffer' },
    ],
    milestones: [
      { phase: 'Phase 1', title: 'Macro Camera Trap & AI Classification Pipeline', weeks: 8, deliverables: ['91% automated pest count accuracy', 'Ultra-low-power sleep firmware', '3D printed trap enclosure'] },
      { phase: 'Phase 2', title: 'University Validation Trials (100 Traps)', weeks: 10, deliverables: ['Entomology correlation study complete', 'Weather station API integration', 'Automated heat map generation'] },
      { phase: 'Phase 3', title: 'Farmer Vernacular App & KVK Integration', weeks: 8, deliverables: ['Voice-guided advisory in 4 languages', 'Integration with Kisan Call Centre platform', 'Early alert push mechanism'] },
      { phase: 'Phase 4', title: 'State Directorate of Agriculture Rollout', weeks: 6, deliverables: ['State-wide pest surveillance dashboard', 'Policy recommendation brief', 'Commercial lure partner on-boarding'] },
    ],
    stack: {
      edge: ['ESP32-S3 with embedded camera interface', 'Solar mini-panel + 18650 Li-ion cell', 'Optical macro ring-light LED', 'NB-IoT / GSM cellular modem'],
      backend: ['Node.js / Express', 'PostgreSQL with PostGIS for pest density contours', 'Redis queue for inbound image processing'],
      frontend: ['React 19', 'Tailwind CSS', 'Farmer lightweight Android APK (vernacular, offline cached)'],
      ai_ml: ['MobileNetV4 pest object detector', 'Degree-day biological growth simulator', 'Spatial-temporal kriging interpolation'],
      cloud: ['NIC MeghRaj Cloud', 'MinIO image bucket', 'Grafana alerting alerts'],
    },
    risks: [
      { risk: 'Non-target insects clogging trap optics during monsoon nights', severity: 'Medium', probability: 'High', mitigation: 'Species-selective pheromone attractants and automated digital outlier image rejection filters.' },
      { risk: 'Low digital literacy among marginal cotton farmers', severity: 'High', probability: 'Medium', mitigation: 'Automated outbound voice calls in local dialect with simple push-button escalation.' },
      { risk: 'Extreme outdoor temperature degrading pheromone lure longevity', severity: 'Medium', probability: 'Medium', mitigation: 'Controlled-release microencapsulated lure matrix providing 90-day constant dispersal.' },
    ],
    govTags: ['Pradhan Mantri Fasal Bima Yojana', 'National Mission on Agricultural Extension', 'Digital Agriculture Mission', 'ICAR Technology Transfer'],
  },
  {
    keywords: ['drone', 'uav', 'aerial', 'surveillance', 'mapping', 'lidar', 'autonomous flight', 'aero', 'hexacopter'],
    archetype: 'Autonomous UAV & Multispectral Aerial Mapping Platform',
    sector: 'Aerospace & Civil Defense',
    domainExplanation: 'DGCA-type certified industrial UAV platform with multispectral cameras and automated flight planning for land record and infrastructure audits.',
    baseMinINR: 5200000,
    baseExpectedINR: 8200000,
    baseMaxINR: 12500000,
    optimisticMonths: 7,
    expectedMonths: 11,
    pessimisticMonths: 16,
    breakdown: [
      { category: 'Airframe Engineering & Avionics Integration', pct: 32, justification: 'Carbon-fiber airframe, redundant flight controller, failsafe parachute, fail-safe motor propulsion' },
      { category: 'Multispectral & Photogrammetry Processing Engine', pct: 24, justification: 'Orthomosaic stitching pipeline, RTK/PPK centimetre-accuracy geo-rectification, NDVI computation' },
      { category: 'DGCA Type Certification & NPNT Compliance', pct: 20, justification: 'DigitalSky NPNT firmware integration, lab testing at authorized testing entity, CAR Section 3 compliance' },
      { category: 'Field Demonstrations & Pilot Training Academy', pct: 14, justification: 'Pilot certification for 10 state surveyors, real-world village boundary surveys under SVAMITVA scheme' },
      { category: 'Regulatory Compliance & Contingency Reserve', pct: 10, justification: 'Third-party liability insurance, spare battery cycles, engineering reserve' },
    ],
    milestones: [
      { phase: 'Phase 1', title: 'Airframe Avionics & Fail-Safe Bench Testing', weeks: 10, deliverables: ['45-minute payload endurance demonstrated', 'Dual IMU redundancy verified', 'NPNT compliance proof'] },
      { phase: 'Phase 2', title: 'DGCA Type Certification Testing', weeks: 14, deliverables: ['Type Certificate issued by DGCA', 'Environmental stress screening passed', 'DigitalSky integration verified'] },
      { phase: 'Phase 3', title: 'Automated Photogrammetry Cloud Pipeline', weeks: 10, deliverables: ['<3cm GSD ground resolution confirmed', 'Automated orthomosaic cloud generation', 'Survey of India format export'] },
      { phase: 'Phase 4', title: 'SVAMITVA Scheme District Pilot Execution', weeks: 8, deliverables: ['50 villages fully surveyed and mapped', 'Property card data handover to Revenue Dept', 'SLA operational handbook'] },
    ],
    stack: {
      edge: ['Pixhawk Cube Orange Flight Controller', 'Dual RTK-GNSS Receivers', 'Companion Computer (Jetson Orin Nano)', 'Encrypted 2.4GHz Telemetry Link'],
      backend: ['Python / Celery distributed photogrammetry workers', 'PostGIS spatial database', 'FastAPI mission planner'],
      frontend: ['React 19', 'QGIS Web / Cesium 3D Globe', 'Tailwind CSS', 'Tablet GCS (Ground Control Station) app'],
      ai_ml: ['Structure from Motion (SfM) engine', 'Canopy height & NDVI analytical models', 'Automated boundary vectorizer'],
      cloud: ['NIC MeghRaj Cloud / MeitY Empanelled Cloud', 'Distributed MinIO storage cluster', 'Docker containers'],
    },
    risks: [
      { risk: 'Type certification delays due to test backlog at government authorized testing entities', severity: 'Critical', probability: 'High', mitigation: 'Pre-screen test parameters with NABL accredited partner lab prior to official submission.' },
      { risk: 'GPS spoofing or signal jamming in sensitive border or airport vicinity', severity: 'High', probability: 'Medium', mitigation: 'Visual-inertial odometry fallback enabling safe automated return-to-home without GNSS.' },
      { risk: 'Severe thermal battery degradation during summer midday operations (>45°C)', severity: 'Medium', probability: 'High', mitigation: 'Active battery pre-cooling transport case and intelligent thermal throttling algorithm.' },
    ],
    govTags: ['SVAMITVA Scheme', 'DGCA Drone Rules 2021', 'Survey of India Drone Standard', 'National Geospatial Policy'],
  },
  {
    keywords: ['cyber', 'cybersecurity', 'ransomware', 'audit', 'threat', 'malware', 'vulnerability', 'phishing', 'data protection', 'dpdpa'],
    archetype: 'Government Threat Intelligence & DPDPA Compliance Suite',
    sector: 'Cybersecurity & Digital Governance',
    domainExplanation: 'Continuous automated vulnerability management, Indian critical infrastructure threat intelligence, and DPDPA 2023 compliance auditing suite.',
    baseMinINR: 3200000,
    baseExpectedINR: 5100000,
    baseMaxINR: 7800000,
    optimisticMonths: 5,
    expectedMonths: 8,
    pessimisticMonths: 12,
    breakdown: [
      { category: 'Automated Vulnerability & Attack Surface Scanner', pct: 30, justification: 'Non-intrusive port, API, and credential exposure scanner tailored for state portal domains' },
      { category: 'Threat Intelligence Ingestion & CERT-In Feed Connector', pct: 24, justification: 'Automated correlation with CERT-In advisories, dark web credential breach monitoring, IOC parser' },
      { category: 'DPDPA 2023 Consent & Data Audit Ledger', pct: 20, justification: 'Tamper-evident audit logging for personal data access, citizen consent manager, breach notifier' },
      { category: 'State Data Centre (SDC) Pilot Deployment', pct: 16, justification: 'Proof of concept on 15 state department portals, pen-testing validation by CERT-In empaneled auditor' },
      { category: 'CERT-In Empanelment & Contingency', pct: 10, justification: 'Documentation for government procurement empanelment, vulnerability disclosure program reserve' },
    ],
    milestones: [
      { phase: 'Phase 1', title: 'Scanner Core & Asset Discovery Engine', weeks: 8, deliverables: ['Subdomain enumeration with zero false positives', 'API schema security fuzzing suite', 'OWASP Top 10 automated test pass'] },
      { phase: 'Phase 2', title: 'Threat Intelligence Correlation & SIEM Ingestion', weeks: 10, deliverables: ['Real-time CERT-In advisory mapper', 'Integration with state SIEM (Splunk / Elastic)', 'Automated severity triage engine'] },
      { phase: 'Phase 3', title: 'DPDPA 2023 Compliance Auditing Module', weeks: 8, deliverables: ['Consent artifact verification engine', 'Data retention policy enforcement bot', 'Automated compliance score report'] },
      { phase: 'Phase 4', title: 'State IT Department Integration & Drills', weeks: 6, deliverables: ['Live cyber crisis tabletop exercise conducted', 'Deployment across 20 departmental servers', 'Handover documentation'] },
    ],
    stack: {
      edge: ['Go-based lightweight endpoint audit agent', 'eBPF kernel telemetry collector', 'Isolated Docker sandbox'],
      backend: ['Go microservices', 'ClickHouse (fast log analytics)', 'PostgreSQL for metadata', 'Kafka log ingestion'],
      frontend: ['React 19', 'Tailwind CSS', 'D3.js interactive attack path visualization', 'Executive CISO dashboard'],
      ai_ml: ['Transformer-based anomaly detection on access logs', 'Automated false-positive classification model'],
      cloud: ['State Data Centre (SDC) Air-Gapped Setup / NIC Cloud', 'HashiCorp Vault secret management', 'OpenSearch cluster'],
    },
    risks: [
      { risk: 'Passive scanning mistaken for malicious intrusion by network firewalls', severity: 'High', probability: 'Medium', mitigation: 'Strict source IP whitelisting and pre-negotiated safe harbor protocol with SDC network admins.' },
      { risk: 'High alert fatigue among understaffed government IT security teams', severity: 'High', probability: 'High', mitigation: 'Rule-based contextual de-duplication reducing raw alerts to single consolidated actionable incidents.' },
      { risk: 'Evolving DPDPA statutory rules requiring retrospective architecture refactoring', severity: 'Medium', probability: 'Medium', mitigation: 'Modular plug-and-play regulatory policy engine enabling rule updates without core recompilation.' },
    ],
    govTags: ['CERT-In Cybersecurity Directions', 'Digital Personal Data Protection Act (DPDPA) 2023', 'MeitY Guidelines', 'Critical Information Infrastructure Protection'],
  },
];

function generateGenericEstimate(statement: string, sectorHint?: string): AIEstimateResult {
  let hash = 0;
  for (let i = 0; i < statement.length; i++) {
    hash = (hash << 5) - hash + statement.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const minINR = 2000000 + (absHash % 25) * 100000;
  const expectedINR = Math.round(minINR * 1.55);
  const maxINR = Math.round(expectedINR * 1.45);

  const optMonths = 4 + (absHash % 4);
  const expMonths = optMonths + 3;
  const pessMonths = expMonths + 4;
  const pertWeighted = Number(((optMonths + 4 * expMonths + pessMonths) / 6).toFixed(1));

  const p1 = 26 + (absHash % 6);
  const p2 = 24 + ((absHash >> 2) % 6);
  const p3 = 20 + ((absHash >> 4) % 5);
  const p4 = 18 - ((absHash >> 6) % 4);
  const p5 = 100 - (p1 + p2 + p3 + p4);

  const sector = sectorHint || 'Civic Technology & Public Innovation';

  return {
    statement,
    detected_archetype: 'Civic Innovation & Smart Governance System',
    sector,
    domain_explanation: 'Custom digital solution addressing civic delivery challenges with real-time analytics, mobile accessibility, and transparent administrative tracking.',
    budget_range: {
      min_inr: minINR,
      expected_inr: expectedINR,
      max_inr: maxINR,
    },
    budget_breakdown: [
      { category: 'Core Software Platform & API Architecture', percentage: p1, amount_inr: Math.round((expectedINR * p1) / 100), justification: 'Multi-tenant backend microservices, database schemas, secure public authentication' },
      { category: 'AI/Analytics & Data Processing Pipeline', percentage: p2, amount_inr: Math.round((expectedINR * p2) / 100), justification: 'Machine learning prioritization models, automated trend detection, spatial data ingestion' },
      { category: 'Mobile & Web Citizen/Officer Interfaces', percentage: p3, amount_inr: Math.round((expectedINR * p3) / 100), justification: 'Responsive portal, bilingual mobile application, accessible WCAG 2.1 AA UI components' },
      { category: 'Field Testing, Training & Pilot Rollout', percentage: p4, amount_inr: Math.round((expectedINR * p4) / 100), justification: 'User acceptance trials across 2 municipal districts, stakeholder feedback workshops' },
      { category: 'Compliance, Security Audit & Contingency', percentage: p5, amount_inr: Math.round((expectedINR * p5) / 100), justification: 'CERT-In security audit, automated vulnerability scanning, contingency buffer' },
    ],
    pert_timeline: {
      optimistic_months: optMonths,
      expected_months: expMonths,
      pessimistic_months: pessMonths,
      pert_weighted_months: pertWeighted,
    },
    milestones: [
      { phase: 'Phase 1', title: 'Requirement Architecture & Prototyping', duration_weeks: 6, deliverables: ['System architecture blueprint', 'Database schema & API contracts', 'Interactive Figma design system'] },
      { phase: 'Phase 2', title: 'Core Implementation & Algorithm Validation', duration_weeks: 10, deliverables: ['Backend services deployed to staging', 'AI analytical pipeline validated (>85% baseline)', 'Officer console operational'] },
      { phase: 'Phase 3', title: 'Department Pilot & Integration Testing', duration_weeks: 8, deliverables: ['Live pilot deployment in 1 administrative division', 'User feedback iterations', 'Security audit compliance'] },
      { phase: 'Phase 4', title: 'Full Deployment & Operations Handover', duration_weeks: 6, deliverables: ['State-wide production rollout', 'Operational SLA manual and training videos', 'Project impact completion report'] },
    ],
    recommended_stack: {
      backend: ['Node.js / Express or Python FastAPI', 'PostgreSQL with JSONB support', 'Redis caching layer'],
      frontend: ['React 19', 'Tailwind CSS', 'Vite', 'Mobile-responsive PWA'],
      ai_ml: ['PyTorch / Scikit-learn', 'NLP & tabular classification models', 'FastAPI inference microservice'],
      cloud_infra: ['NIC MeghRaj Cloud / AWS GovCloud', 'Docker & Kubernetes', 'Prometheus & Grafana monitoring'],
    },
    risk_matrix: [
      { risk: 'User adoption inertia among government departmental staff', severity: 'High', probability: 'Medium', mitigation: 'Intuitive zero-training UI with automated WhatsApp notification shortcuts.' },
      { risk: 'Integration delays with legacy government databases', severity: 'Medium', probability: 'High', mitigation: 'Implement modular API proxy adapter with robust offline asynchronous queueing.' },
      { risk: 'Security audit finding remediations before public launch', severity: 'Medium', probability: 'Low', mitigation: 'Integrate automated static application security testing (SAST) into CI/CD pipeline.' },
    ],
    government_alignment_tags: ['Digital India', 'National e-Governance Plan (NeGP)', 'Mission Karmayogi', 'Atmanirbhar Bharat'],
    estimated_at: new Date().toISOString(),
  };
}

export class AIEstimatorService {
  public static estimateProblem(statement: string, sectorHint?: string): AIEstimateResult {
    const textLower = statement.toLowerCase();

    for (const rule of ARCHETYPES) {
      const match = rule.keywords.some((kw) => textLower.includes(kw));
      if (match) {
        let wordHash = 0;
        for (let i = 0; i < statement.length; i++) {
          wordHash = (wordHash << 5) - wordHash + statement.charCodeAt(i);
          wordHash |= 0;
        }
        const deltaMultiplier = 0.9 + (Math.abs(wordHash) % 25) / 100;

        const minINR = Math.round((rule.baseMinINR * deltaMultiplier) / 10000) * 10000;
        const expINR = Math.round((rule.baseExpectedINR * deltaMultiplier) / 10000) * 10000;
        const maxINR = Math.round((rule.baseMaxINR * deltaMultiplier) / 10000) * 10000;

        const breakdown: BudgetBreakdownItem[] = rule.breakdown.map((item) => ({
          category: item.category,
          percentage: item.pct,
          amount_inr: Math.round((expINR * item.pct) / 100),
          justification: item.justification,
        }));

        const milestones: MilestoneItem[] = rule.milestones.map((m) => ({
          phase: m.phase,
          title: m.title,
          duration_weeks: m.weeks,
          deliverables: m.deliverables,
        }));

        const pertWeighted = Number(
          ((rule.optimisticMonths + 4 * rule.expectedMonths + rule.pessimisticMonths) / 6).toFixed(1)
        );

        return {
          statement,
          detected_archetype: rule.archetype,
          sector: rule.sector,
          domain_explanation: rule.domainExplanation,
          budget_range: {
            min_inr: minINR,
            expected_inr: expINR,
            max_inr: maxINR,
          },
          budget_breakdown: breakdown,
          pert_timeline: {
            optimistic_months: rule.optimisticMonths,
            expected_months: rule.expectedMonths,
            pessimistic_months: rule.pessimisticMonths,
            pert_weighted_months: pertWeighted,
          },
          milestones,
          recommended_stack: {
            edge_hardware: rule.stack.edge,
            backend: rule.stack.backend,
            frontend: rule.stack.frontend,
            ai_ml: rule.stack.ai_ml,
            cloud_infra: rule.stack.cloud,
          },
          risk_matrix: rule.risks,
          government_alignment_tags: rule.govTags,
          estimated_at: new Date().toISOString(),
        };
      }
    }

    return generateGenericEstimate(statement, sectorHint);
  }
}
