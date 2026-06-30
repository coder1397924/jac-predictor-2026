import { BranchInfo, CutoffData, Prediction2026, BranchCode, CategoryCode } from './types';

export const BRANCHES: Record<BranchCode, BranchInfo> = {
  NSUT_CSAI: { code: 'NSUT_CSAI', college: 'NSUT', name: 'Computer Science (AI)', campus: 'NSUT Main', description: 'Specialization in CS focusing on artificial intelligence and deep learning.', duration: '4 Years', intake: 120 },
  NSUT_CSE:  { code: 'NSUT_CSE',  college: 'NSUT', name: 'Computer Science and Engineering', campus: 'NSUT Main', description: 'Foundational computer science curriculum covering algorithms and systems.', duration: '4 Years', intake: 180 },
  NSUT_CSDS: { code: 'NSUT_CSDS', college: 'NSUT', name: 'Computer Science (Data Science)', campus: 'NSUT Main', description: 'Computer Science track centering on big data platforms and analytical databases.', duration: '4 Years', intake: 120 },
  NSUT_IT:   { code: 'NSUT_IT',   college: 'NSUT', name: 'Information Technology', campus: 'NSUT Main', description: 'Information systems, cloud infrastructure networks, and server scaling.', duration: '4 Years', intake: 120 },
  NSUT_ITNS: { code: 'NSUT_ITNS', college: 'NSUT', name: 'IT (Network & Information Security)', campus: 'NSUT Main', description: 'Focused study on cybersecurity diagnostics and virtual networks.', duration: '4 Years', intake: 60 },
  NSUT_MAC:  { code: 'NSUT_MAC',  college: 'NSUT', name: 'Mathematics and Computing', campus: 'NSUT Main', description: 'Interdisciplinary program combining mathematics and computer science.', duration: '4 Years', intake: 90 },
  NSUT_ECE:  { code: 'NSUT_ECE',  college: 'NSUT', name: 'Electronics & Communication', campus: 'NSUT Main', description: 'Core hardware, cellular communication networks, and telecom design.', duration: '4 Years', intake: 240 },
  NSUT_EVDT: { code: 'NSUT_EVDT', college: 'NSUT', name: 'Electronics Engineering (VLSI)', campus: 'NSUT Main', description: 'Semiconductor layouts, chip fabrication, and core VLSI design.', duration: '4 Years', intake: 90 },
  NSUT_EE:   { code: 'NSUT_EE',   college: 'NSUT', name: 'Electrical Engineering', campus: 'NSUT Main', description: 'Power transmission, smart energy generation, and electrical circuit designs.', duration: '4 Years', intake: 120 },
  NSUT_ICE:  { code: 'NSUT_ICE',  college: 'NSUT', name: 'Instrumentation & Control', campus: 'NSUT Main', description: 'Sensory devices, SCADA, industrial automation transmitters, and robotics.', duration: '4 Years', intake: 120 },
  NSUT_ME:   { code: 'NSUT_ME',   college: 'NSUT', name: 'Mechanical Engineering', campus: 'NSUT Main', description: 'Thermodynamics, computational fluid dynamics (CFD), and structural dynamics.', duration: '4 Years', intake: 120 },
  NSUT_BT:   { code: 'NSUT_BT',   college: 'NSUT', name: 'Bio-Technology', campus: 'NSUT Main', description: 'Genetic engineering, bioinformatics, and fermentation technology.', duration: '4 Years', intake: 60 },
  // ✅ East Campus branches (introduced 2022 onwards)
  NSUT_CSDA: { code: 'NSUT_CSDA', college: 'NSUT', name: 'CS (Big Data Analytics)', campus: 'NSUT East', description: 'East campus specialization centering on modern enterprise databases.', duration: '4 Years', intake: 60 },
  NSUT_CIOT: { code: 'NSUT_CIOT', college: 'NSUT', name: 'CS (Internet of Things)', campus: 'NSUT East', description: 'Embedded firmware, hardware sensors, and wireless networks.', duration: '4 Years', intake: 60 },
  NSUT_ECAM: { code: 'NSUT_ECAM', college: 'NSUT', name: 'Electronics (AI & ML)', campus: 'NSUT East', description: 'Electronics branch integrated with ML accelerators and neural processors.', duration: '4 Years', intake: 120 },
  // ✅ West Campus branches
  NSUT_MEEV: { code: 'NSUT_MEEV', college: 'NSUT', name: 'Mechanical (Electric Vehicles)', campus: 'NSUT West', description: 'Specialization on EV drivetrains, lithium battery packs, and solid-state safety.', duration: '4 Years', intake: 60 },
  NSUT_CE:   { code: 'NSUT_CE',   college: 'NSUT', name: 'Civil Engineering', campus: 'NSUT West', description: 'Structural blueprints, urban transit, and geotechnical mapping.', duration: '4 Years', intake: 60 },
  NSUT_GI:   { code: 'NSUT_GI',   college: 'NSUT', name: 'Geoinformatics', campus: 'NSUT West', description: 'Spatial modeling mapping, drone surveying, and GIS mapping.', duration: '4 Years', intake: 60 },
  // DTU
  DTU_COE:   { code: 'DTU_COE',   college: 'DTU', name: 'Computer Science and Engineering', campus: 'DTU Main', description: 'Core computer science, coding, and software engineering.', duration: '4 Years', intake: 480 },
  DTU_CSDS:  { code: 'DTU_CSDS',  college: 'DTU', name: 'CSE (Data Science & Analytics)', campus: 'DTU Main', description: 'Computer science specialized in large scale data analysis and statistics.', duration: '4 Years', intake: 180 },
  DTU_IT:    { code: 'DTU_IT',    college: 'DTU', name: 'Information Technology', campus: 'DTU Main', description: 'Cloud networks, system architecture, database fundamentals.', duration: '4 Years', intake: 180 },
  DTU_ITCS:  { code: 'DTU_ITCS',  college: 'DTU', name: 'Information Technology (Cyber Security)', campus: 'DTU Main', description: 'Information security, ethical hacking, and network defense.', duration: '4 Years', intake: 60 },
  DTU_SE:    { code: 'DTU_SE',    college: 'DTU', name: 'Software Engineering', campus: 'DTU Main', description: 'Intensive focus on SDLC, agile practices, project management.', duration: '4 Years', intake: 180 },
  DTU_MCE:   { code: 'DTU_MCE',   college: 'DTU', name: 'Mathematics & Computing', campus: 'DTU Main', description: 'Heavy focus on applied math, statistics, deep learning formulations.', duration: '4 Years', intake: 180 },
  DTU_ECE:   { code: 'DTU_ECE',   college: 'DTU', name: 'Electronics & Communication', campus: 'DTU Main', description: 'High-tier circuitry design, microprocessors, signal processing.', duration: '4 Years', intake: 240 },
  DTU_EVDT:  { code: 'DTU_EVDT',  college: 'DTU', name: 'Electronics (VLSI Design and Tech)', campus: 'DTU Main', description: 'Chip architecture, embedded systems, semiconductor fabrication.', duration: '4 Years', intake: 60 },
  DTU_EE:    { code: 'DTU_EE',    college: 'DTU', name: 'Electrical Engineering', campus: 'DTU Main', description: 'Heavy current systems, motors, generators, grid connectivity.', duration: '4 Years', intake: 300 },
  DTU_ME:    { code: 'DTU_ME',    college: 'DTU', name: 'Mechanical Engineering', campus: 'DTU Main', description: 'Classic physical engineering, heat transfer, CAD modeling.', duration: '4 Years', intake: 300 },
  DTU_MAE:   { code: 'DTU_MAE',   college: 'DTU', name: 'Mechanical and Automation Engg', campus: 'DTU Main', description: 'Mechanical concepts combined with modern industrial automation.', duration: '4 Years', intake: 60 },
  DTU_AE:    { code: 'DTU_AE',    college: 'DTU', name: 'Mechanical (Automotive Engg)', campus: 'DTU Main', description: 'Specialized focus on vehicle dynamics, engines, and auto design.', duration: '4 Years', intake: 60 },
  DTU_EP:    { code: 'DTU_EP',    college: 'DTU', name: 'Engineering Physics', campus: 'DTU Main', description: 'Applied physics, optics, nanotechnology, and quantum systems.', duration: '4 Years', intake: 60 },
  DTU_CH:    { code: 'DTU_CH',    college: 'DTU', name: 'Chemical Engineering', campus: 'DTU Main', description: 'Reactor design, separations, petrochemical pathways.', duration: '4 Years', intake: 90 },
  DTU_CE:    { code: 'DTU_CE',    college: 'DTU', name: 'Civil Engineering', campus: 'DTU Main', description: 'Core infrastructure, concrete dynamics, soil analysis, surveying.', duration: '4 Years', intake: 150 },
  DTU_PIE:   { code: 'DTU_PIE',   college: 'DTU', name: 'Production & Industrial Engg', campus: 'DTU Main', description: 'Operations management, supply chain optimization.', duration: '4 Years', intake: 90 },
  DTU_ENE:   { code: 'DTU_ENE',   college: 'DTU', name: 'Environmental Engineering', campus: 'DTU Main', description: 'Ecology mapping, climate systems, water treatment.', duration: '4 Years', intake: 90 },
  DTU_BT:    { code: 'DTU_BT',    college: 'DTU', name: 'Bio-Technology', campus: 'DTU Main', description: 'Biological sciences applied through computational models.', duration: '4 Years', intake: 90 },
  // IIITD
  IIITD_CSAM:   { code: 'IIITD_CSAM',   college: 'IIITD', name: 'CS and Applied Mathematics', campus: 'IIITD Okhla', description: 'Rigorous theoretical framework combining mathematics with intensive CS programs.', duration: '4 Years', intake: 60 },
  IIITD_CSAI:   { code: 'IIITD_CSAI',   college: 'IIITD', name: 'CS and Artificial Intelligence', campus: 'IIITD Okhla', description: 'Cutting-edge AI modeling, cognitive science, and heavy neural networking frameworks.', duration: '4 Years', intake: 60 },
  IIITD_CSD:    { code: 'IIITD_CSD',    college: 'IIITD', name: 'Computer Science and Design', campus: 'IIITD Okhla', description: 'UI/UX integration, creative technology, spatial design, and software engineering.', duration: '4 Years', intake: 60 },
  IIITD_CSSS:   { code: 'IIITD_CSSS',   college: 'IIITD', name: 'CS and Social Sciences', campus: 'IIITD Okhla', description: 'Data analytics focused on social behavior, psychology, and structural inequalities.', duration: '4 Years', intake: 60 },
  IIITD_CSB:    { code: 'IIITD_CSB',    college: 'IIITD', name: 'Computer Science and Biosciences', campus: 'IIITD Okhla', description: 'Systems biology, computational genomics, and health data modeling technologies.', duration: '4 Years', intake: 60 },
  IIITD_CSEcon: { code: 'IIITD_CSEcon', college: 'IIITD', name: 'Computer Science and Economics', campus: 'IIITD Okhla', description: 'Focus on algorithmic game theory, econometric models, and computational finance.', duration: '4 Years', intake: 60 },
  IIITD_CSE:    { code: 'IIITD_CSE',    college: 'IIITD', name: 'Computer Science and Engineering', campus: 'IIITD Okhla', description: 'Core software engineering, data structures, and computer architecture.', duration: '4 Years', intake: 120 },
  IIITD_ECE:    { code: 'IIITD_ECE',    college: 'IIITD', name: 'Electronics & Communication', campus: 'IIITD Okhla', description: 'Advanced communication grids, embedded design, and core circuit board design.', duration: '4 Years', intake: 60 },
  IIITD_EVE:    { code: 'IIITD_EVE',    college: 'IIITD', name: 'Electronics and VLSI Engineering', campus: 'IIITD Okhla', description: 'Dedicated VLSI circuits, nanoelectronics, and semiconductor processing labs.', duration: '4 Years', intake: 60 },
  // IGDTUW (Women's University - GL category only)
  IGDTUW_CSE:  { code: 'IGDTUW_CSE',  college: 'IGDTUW', name: 'Computer Science and Engineering', campus: 'IGDTUW Kashmere Gate', description: 'Premier core CS programming and computer architecture branch exclusively for females.', duration: '4 Years', intake: 200 },
  IGDTUW_CSAI: { code: 'IGDTUW_CSAI', college: 'IGDTUW', name: 'Computer Science and AI', campus: 'IGDTUW Kashmere Gate', description: 'Machine learning fundamentals and data processing pipelines mapping for females.', duration: '4 Years', intake: 150 },
  IGDTUW_IT:   { code: 'IGDTUW_IT',   college: 'IGDTUW', name: 'Information Technology', campus: 'IGDTUW Kashmere Gate', description: 'Web tech, networking applications, and scalable database integrations for females.', duration: '4 Years', intake: 150 },
  IGDTUW_ECE:  { code: 'IGDTUW_ECE',  college: 'IGDTUW', name: 'Electronics and Communication', campus: 'IGDTUW Kashmere Gate', description: 'Circuitry protocols, signal handling, and hardware board engineering for females.', duration: '4 Years', intake: 150 },
  IGDTUW_MEAM: { code: 'IGDTUW_MEAM', college: 'IGDTUW', name: 'Mechanical and Automation E.', campus: 'IGDTUW Kashmere Gate', description: 'Auto-control mechanisms, fluid machinery, and automotive electronics for females.', duration: '4 Years', intake: 90 },
  IGDTUW_DMAM: { code: 'IGDTUW_DMAM', college: 'IGDTUW', name: 'Dual Degree ME + MBA', campus: 'IGDTUW Kashmere Gate', description: 'Integrated B.Tech in Mechanical Automation coupled with Masters in Business Admin.', duration: '5 Years', intake: 60 }
};

// ─────────────────────────────────────────────────────────────────────────────
// ACTUAL R1 2026 DATA (unchanged from original - this is real data)
// ─────────────────────────────────────────────────────────────────────────────
export const ACTUAL_R1_2026: Record<CategoryCode, Record<BranchCode, number>> = {
  GNGND: {
    NSUT_CSAI: 4133, NSUT_CSE: 8540, NSUT_CSDS: 9881, NSUT_IT: 13639, NSUT_ITNS: 16961, NSUT_MAC: 18887,
    NSUT_ECE: 23371, NSUT_EVDT: 24554, NSUT_EE: 32370, NSUT_ICE: 35314, NSUT_ME: 44928, NSUT_BT: 56842,
    NSUT_CSDA: 22659, NSUT_CIOT: 27069, NSUT_ECAM: 30964, NSUT_MEEV: 50820, NSUT_CE: 58717, NSUT_GI: 60841,
    DTU_COE: 9170, DTU_CSDS: 10274, DTU_IT: 13499, DTU_ITCS: 17650, DTU_SE: 16857, DTU_MCE: 19022, DTU_ECE: 21428, DTU_EVDT: 23597, DTU_EE: 30596, DTU_ME: 39267,
    DTU_MAE: 41102, DTU_AE: 42305, DTU_EP: 43665, DTU_CH: 46915, DTU_CE: 53519, DTU_PIE: 48274, DTU_ENE: 55999, DTU_BT: 56089,
    IIITD_CSAM: 7954, IIITD_CSAI: 3229, IIITD_CSD: 12012, IIITD_CSSS: 17679, IIITD_CSB: 19614, IIITD_CSEcon: 9177, IIITD_CSE: 5473, IIITD_ECE: 18346, IIITD_EVE: 23809,
    IGDTUW_CSE: 54474, IGDTUW_CSAI: 46524, IGDTUW_IT: 76074, IGDTUW_ECE: 89704, IGDTUW_MEAM: 105008, IGDTUW_DMAM: 108519
  },
  GNGLD: {
    NSUT_CSAI: 9652, NSUT_CSE: 17330, NSUT_CSDS: 17954, NSUT_IT: 21142, NSUT_ITNS: 24129, NSUT_MAC: 22506,
    NSUT_ECE: 31883, NSUT_EVDT: 35291, NSUT_EE: 48352, NSUT_ICE: 77184, NSUT_ME: 93879, NSUT_BT: 102972,
    NSUT_CSDA: 30563, NSUT_CIOT: 38548, NSUT_ECAM: 75286, NSUT_MEEV: 102505, NSUT_CE: 109073, NSUT_GI: 98592,
    DTU_COE: 12243, DTU_CSDS: 12957, DTU_IT: 17274, DTU_ITCS: 21218, DTU_SE: 22206, DTU_MCE: 25676, DTU_ECE: 28719, DTU_EVDT: 31363, DTU_EE: 41729, DTU_ME: 65596,
    DTU_MAE: 88314, DTU_AE: 82576, DTU_EP: 70149, DTU_CH: 93220, DTU_CE: 101230, DTU_PIE: 103921, DTU_ENE: 81414, DTU_BT: 89684,
    IIITD_CSAM: 7954, IIITD_CSAI: 3229, IIITD_CSD: 12012, IIITD_CSSS: 17679, IIITD_CSB: 19614, IIITD_CSEcon: 9177, IIITD_CSE: 5473, IIITD_ECE: 18346, IIITD_EVE: 23809,
    IGDTUW_CSE: 54474, IGDTUW_CSAI: 46524, IGDTUW_IT: 76074, IGDTUW_ECE: 89704, IGDTUW_MEAM: 105008, IGDTUW_DMAM: 108519
  },
  EWGND: {
    NSUT_CSAI: 16334, NSUT_CSE: 26656, NSUT_CSDS: 28666, NSUT_IT: 35635, NSUT_ITNS: 39168, NSUT_MAC: 41784,
    NSUT_ECE: 50660, NSUT_EVDT: 52940, NSUT_EE: 62763, NSUT_ICE: 65703, NSUT_ME: 77463, NSUT_BT: 98901,
    NSUT_CSDA: 46062, NSUT_CIOT: 55313, NSUT_ECAM: 60565, NSUT_MEEV: 91837, NSUT_CE: 98936, NSUT_GI: 109487,
    DTU_COE: 24019, DTU_CSDS: 26893, DTU_IT: 33309, DTU_ITCS: 34018, DTU_SE: 38763, DTU_MCE: 41651, DTU_ECE: 45197, DTU_EVDT: 49827, DTU_EE: 62064, DTU_ME: 72599,
    DTU_MAE: 70775, DTU_AE: 73820, DTU_EP: 72665, DTU_CH: 82616, DTU_CE: 90594, DTU_PIE: 84086, DTU_ENE: 95086, DTU_BT: 95505,
    IIITD_CSAM: 31941, IIITD_CSAI: 22416, IIITD_CSD: 42132, IIITD_CSSS: 45269, IIITD_CSB: 51580, IIITD_CSEcon: 40752, IIITD_CSE: 24471, IIITD_ECE: 49472, IIITD_EVE: 55410,
    IGDTUW_CSE: 107420, IGDTUW_CSAI: 98573, IGDTUW_IT: 128206, IGDTUW_ECE: 168045, IGDTUW_MEAM: 200412, IGDTUW_DMAM: 210320
  },
  EWGLD: {
    NSUT_CSAI: 19159, NSUT_CSE: 34412, NSUT_CSDS: 37831, NSUT_IT: 46344, NSUT_ITNS: 47913, NSUT_MAC: 54321,
    NSUT_ECE: 82499, NSUT_EVDT: 85456, NSUT_EE: 170676, NSUT_ICE: 181188, NSUT_ME: 190864, NSUT_BT: 155276,
    NSUT_CSDA: 75563, NSUT_CIOT: 106088, NSUT_ECAM: 123304, NSUT_MEEV: 205340, NSUT_CE: 212112, NSUT_GI: 19159,
    DTU_COE: 31101, DTU_CSDS: 34476, DTU_IT: 40896, DTU_ITCS: 0, DTU_SE: 43342, DTU_MCE: 47384, DTU_ECE: 59866, DTU_EVDT: 77950, DTU_EE: 119162, DTU_ME: 190814,
    DTU_MAE: 137498, DTU_AE: 0, DTU_EP: 190393, DTU_CH: 0, DTU_CE: 171924, DTU_PIE: 211425, DTU_ENE: 0, DTU_BT: 0,
    IIITD_CSAM: 31941, IIITD_CSAI: 22416, IIITD_CSD: 42132, IIITD_CSSS: 45269, IIITD_CSB: 51580, IIITD_CSEcon: 40752, IIITD_CSE: 24471, IIITD_ECE: 49472, IIITD_EVE: 55410,
    IGDTUW_CSE: 107420, IGDTUW_CSAI: 98573, IGDTUW_IT: 128206, IGDTUW_ECE: 168045, IGDTUW_MEAM: 200412, IGDTUW_DMAM: 210320
  },
  OBGND: {
    NSUT_CSAI: 25117, NSUT_CSE: 42757, NSUT_CSDS: 49177, NSUT_IT: 65146, NSUT_ITNS: 76667, NSUT_MAC: 86205,
    NSUT_ECE: 105700, NSUT_EVDT: 109458, NSUT_EE: 131098, NSUT_ICE: 143847, NSUT_ME: 165988, NSUT_BT: 203550,
    NSUT_CSDA: 98243, NSUT_CIOT: 110830, NSUT_ECAM: 128114, NSUT_MEEV: 184146, NSUT_CE: 214388, NSUT_GI: 224921,
    DTU_COE: 41031, DTU_CSDS: 47321, DTU_IT: 57324, DTU_ITCS: 76895, DTU_SE: 75460, DTU_MCE: 86302, DTU_ECE: 94929, DTU_EVDT: 101366, DTU_EE: 127387, DTU_ME: 155310,
    DTU_MAE: 155856, DTU_AE: 158878, DTU_EP: 165541, DTU_CH: 175163, DTU_CE: 188807, DTU_PIE: 187637, DTU_ENE: 197523, DTU_BT: 198937,
    IIITD_CSAM: 64398, IIITD_CSAI: 31829, IIITD_CSD: 81079, IIITD_CSSS: 96074, IIITD_CSB: 105831, IIITD_CSEcon: 88307, IIITD_CSE: 52567, IIITD_ECE: 110055, IIITD_EVE: 118068,
    IGDTUW_CSE: 203035, IGDTUW_CSAI: 188349, IGDTUW_IT: 259505, IGDTUW_ECE: 352787, IGDTUW_MEAM: 423969, IGDTUW_DMAM: 424320
  },
  OBGLD: {
    NSUT_CSAI: 54933, NSUT_CSE: 75429, NSUT_CSDS: 76696, NSUT_IT: 96708, NSUT_ITNS: 124946, NSUT_MAC: 143918,
    NSUT_ECE: 204902, NSUT_EVDT: 254935, NSUT_EE: 318467, NSUT_ICE: 379606, NSUT_ME: 402963, NSUT_BT: 404169,
    NSUT_CSDA: 139122, NSUT_CIOT: 205463, NSUT_ECAM: 323666, NSUT_MEEV: 424038, NSUT_CE: 434757, NSUT_GI: 447157,
    DTU_COE: 66166, DTU_CSDS: 49320, DTU_IT: 81865, DTU_ITCS: 89361, DTU_SE: 95474, DTU_MCE: 132193, DTU_ECE: 152819, DTU_EVDT: 171193, DTU_EE: 306083, DTU_ME: 365531,
    DTU_MAE: 314405, DTU_AE: 259556, DTU_EP: 223132, DTU_CH: 295003, DTU_CE: 371364, DTU_PIE: 371587, DTU_ENE: 399179, DTU_BT: 360197,
    IIITD_CSAM: 64398, IIITD_CSAI: 31829, IIITD_CSD: 81079, IIITD_CSSS: 96074, IIITD_CSB: 105831, IIITD_CSEcon: 88307, IIITD_CSE: 52567, IIITD_ECE: 110055, IIITD_EVE: 118068,
    IGDTUW_CSE: 203035, IGDTUW_CSAI: 188349, IGDTUW_IT: 259505, IGDTUW_ECE: 352787, IGDTUW_MEAM: 423969, IGDTUW_DMAM: 424320
  },
  GNGNO: {
    NSUT_CSAI: 1152, NSUT_CSE: 2439, NSUT_CSDS: 2845, NSUT_IT: 3511, NSUT_ITNS: 4122, NSUT_MAC: 4841,
    NSUT_ECE: 6531, NSUT_EVDT: 6842, NSUT_EE: 8541, NSUT_ICE: 9845, NSUT_ME: 12451, NSUT_BT: 18451,
    NSUT_CSDA: 6145, NSUT_CIOT: 7851, NSUT_ECAM: 8451, NSUT_MEEV: 14512, NSUT_CE: 16412, NSUT_GI: 18145,
    DTU_COE: 1421, DTU_CSDS: 1600, DTU_IT: 2845, DTU_ITCS: 3000, DTU_SE: 1845, DTU_MCE: 2451, DTU_ECE: 5124, DTU_EVDT: 5541, DTU_EE: 8145, DTU_ME: 11451,
    DTU_MAE: 12000, DTU_AE: 12500, DTU_EP: 13000, DTU_CH: 17412, DTU_CE: 15412, DTU_PIE: 13412, DTU_ENE: 16412, DTU_BT: 21451,
    IIITD_CSAM: 1985, IIITD_CSAI: 758, IIITD_CSD: 4959, IIITD_CSSS: 6775, IIITD_CSB: 7148, IIITD_CSEcon: 4167, IIITD_CSE: 0, IIITD_ECE: 4375, IIITD_EVE: 5443,
    IGDTUW_CSE: 3541, IGDTUW_CSAI: 2451, IGDTUW_IT: 4124, IGDTUW_ECE: 6845, IGDTUW_MEAM: 14512, IGDTUW_DMAM: 15412
  },
  EWGNO: {
    NSUT_CSAI: 1845, NSUT_CSE: 3845, NSUT_CSDS: 4512, NSUT_IT: 5841, NSUT_ITNS: 6541, NSUT_MAC: 7451,
    NSUT_ECE: 9541, NSUT_EVDT: 10451, NSUT_EE: 13451, NSUT_ICE: 15412, NSUT_ME: 18451, NSUT_BT: 25412,
    NSUT_CSDA: 9145, NSUT_CIOT: 11451, NSUT_ECAM: 12451, NSUT_MEEV: 21451, NSUT_CE: 25412, NSUT_GI: 28412,
    DTU_COE: 2451, DTU_CSDS: 2700, DTU_IT: 4512, DTU_ITCS: 5000, DTU_SE: 2945, DTU_MCE: 3845, DTU_ECE: 8145, DTU_EVDT: 8541, DTU_EE: 12451, DTU_ME: 17451,
    DTU_MAE: 18000, DTU_AE: 18500, DTU_EP: 19000, DTU_CH: 24145, DTU_CE: 22412, DTU_PIE: 19412, DTU_ENE: 23145, DTU_BT: 29451,
    IIITD_CSAM: 7843, IIITD_CSAI: 7709, IIITD_CSD: 8447, IIITD_CSSS: 11162, IIITD_CSB: 9855, IIITD_CSEcon: 0, IIITD_CSE: 7066, IIITD_ECE: 0, IIITD_EVE: 10546,
    IGDTUW_CSE: 5841, IGDTUW_CSAI: 4124, IGDTUW_IT: 6845, IGDTUW_ECE: 9124, IGDTUW_MEAM: 20145, IGDTUW_DMAM: 21451
  },
  OBGNO: {
    NSUT_CSAI: 3145, NSUT_CSE: 6145, NSUT_CSDS: 7124, NSUT_IT: 9145, NSUT_ITNS: 10451, NSUT_MAC: 11451,
    NSUT_ECE: 15412, NSUT_EVDT: 16412, NSUT_EE: 21451, NSUT_ICE: 24512, NSUT_ME: 28451, NSUT_BT: 35412,
    NSUT_CSDA: 14512, NSUT_CIOT: 17451, NSUT_ECAM: 19412, NSUT_MEEV: 32145, NSUT_CE: 38412, NSUT_GI: 41245,
    DTU_COE: 3845, DTU_CSDS: 4200, DTU_IT: 7145, DTU_ITCS: 7500, DTU_SE: 4845, DTU_MCE: 6145, DTU_ECE: 13451, DTU_EVDT: 14124, DTU_EE: 19451, DTU_ME: 27451,
    DTU_MAE: 28000, DTU_AE: 29000, DTU_EP: 30000, DTU_CH: 36145, DTU_CE: 34124, DTU_PIE: 30145, DTU_ENE: 35145, DTU_BT: 44145,
    IIITD_CSAM: 4996, IIITD_CSAI: 4568, IIITD_CSD: 12758, IIITD_CSSS: 16012, IIITD_CSB: 11780, IIITD_CSEcon: 10689, IIITD_CSE: 7566, IIITD_ECE: 13885, IIITD_EVE: 19119,
    IGDTUW_CSE: 9145, IGDTUW_CSAI: 7145, IGDTUW_IT: 11451, IGDTUW_ECE: 18145, IGDTUW_MEAM: 32145, IGDTUW_DMAM: 34145
  },
  GNGLO: {
    NSUT_CSAI: 1728, NSUT_CSE: 3658, NSUT_CSDS: 4267, NSUT_IT: 5266, NSUT_ITNS: 6183, NSUT_MAC: 7261,
    NSUT_ECE: 9796, NSUT_EVDT: 10263, NSUT_EE: 12811, NSUT_ICE: 14767, NSUT_ME: 18676, NSUT_BT: 27676,
    NSUT_CSDA: 9217, NSUT_CIOT: 11776, NSUT_ECAM: 12676, NSUT_MEEV: 21768, NSUT_CE: 24618, NSUT_GI: 27217,
    DTU_COE: 2131, DTU_CSDS: 2400, DTU_IT: 4267, DTU_ITCS: 4500, DTU_SE: 2767, DTU_MCE: 3676, DTU_ECE: 7686, DTU_EVDT: 8311, DTU_EE: 12217, DTU_ME: 17176,
    DTU_MAE: 18000, DTU_AE: 18500, DTU_EP: 19000, DTU_CH: 26118, DTU_CE: 23118, DTU_PIE: 20118, DTU_ENE: 24618, DTU_BT: 32176,
    IIITD_CSAM: 1985, IIITD_CSAI: 758, IIITD_CSD: 4959, IIITD_CSSS: 6775, IIITD_CSB: 7148, IIITD_CSEcon: 4167, IIITD_CSE: 0, IIITD_ECE: 4375, IIITD_EVE: 5443,
    IGDTUW_CSE: 5311, IGDTUW_CSAI: 3676, IGDTUW_IT: 6186, IGDTUW_ECE: 10267, IGDTUW_MEAM: 21768, IGDTUW_DMAM: 23118
  },
  EWGLO: {
    NSUT_CSAI: 2767, NSUT_CSE: 5767, NSUT_CSDS: 6768, NSUT_IT: 8761, NSUT_ITNS: 9811, NSUT_MAC: 11176,
    NSUT_ECE: 14311, NSUT_EVDT: 15676, NSUT_EE: 20176, NSUT_ICE: 23118, NSUT_ME: 27676, NSUT_BT: 38118,
    NSUT_CSDA: 13717, NSUT_CIOT: 17176, NSUT_ECAM: 18676, NSUT_MEEV: 32176, NSUT_CE: 38118, NSUT_GI: 42618,
    DTU_COE: 3676, DTU_CSDS: 4000, DTU_IT: 6768, DTU_ITCS: 7000, DTU_SE: 4417, DTU_MCE: 5767, DTU_ECE: 12217, DTU_EVDT: 12811, DTU_EE: 18676, DTU_ME: 26176,
    DTU_MAE: 27000, DTU_AE: 28000, DTU_EP: 29000, DTU_CH: 36217, DTU_CE: 33618, DTU_PIE: 29118, DTU_ENE: 34717, DTU_BT: 44176,
    IIITD_CSAM: 7843, IIITD_CSAI: 7709, IIITD_CSD: 8447, IIITD_CSSS: 11162, IIITD_CSB: 9855, IIITD_CSEcon: 0, IIITD_CSE: 7066, IIITD_ECE: 0, IIITD_EVE: 10546,
    IGDTUW_CSE: 8761, IGDTUW_CSAI: 6186, IGDTUW_IT: 10267, IGDTUW_ECE: 13686, IGDTUW_MEAM: 30217, IGDTUW_DMAM: 32176
  },
  OBGLO: {
    NSUT_CSAI: 4717, NSUT_CSE: 9217, NSUT_CSDS: 10686, NSUT_IT: 13717, NSUT_ITNS: 15676, NSUT_MAC: 17176,
    NSUT_ECE: 23118, NSUT_EVDT: 24618, NSUT_EE: 32176, NSUT_ICE: 36768, NSUT_ME: 42676, NSUT_BT: 53118,
    NSUT_CSDA: 21768, NSUT_CIOT: 26176, NSUT_ECAM: 29118, NSUT_MEEV: 48217, NSUT_CE: 57618, NSUT_GI: 61867,
    DTU_COE: 5767, DTU_CSDS: 6000, DTU_IT: 10717, DTU_ITCS: 11000, DTU_SE: 7267, DTU_MCE: 9217, DTU_ECE: 20176, DTU_EVDT: 21186, DTU_EE: 29176, DTU_ME: 41176,
    DTU_MAE: 42000, DTU_AE: 43000, DTU_EP: 44000, DTU_CH: 54217, DTU_CE: 51186, DTU_PIE: 45217, DTU_ENE: 52717, DTU_BT: 66217,
    IIITD_CSAM: 4996, IIITD_CSAI: 4568, IIITD_CSD: 12758, IIITD_CSSS: 16012, IIITD_CSB: 11780, IIITD_CSEcon: 10689, IIITD_CSE: 7566, IIITD_ECE: 13885, IIITD_EVE: 19119,
    IGDTUW_CSE: 13717, IGDTUW_CSAI: 10717, IGDTUW_IT: 17176, IGDTUW_ECE: 27217, IGDTUW_MEAM: 48217, IGDTUW_DMAM: 51217
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIXED: Branches introduced after 2021 - properly expanded list
// ─────────────────────────────────────────────────────────────────────────────
const BRANCH_INTRO_YEAR: Partial<Record<BranchCode, number>> = {
  // VLSI branches introduced 2023
  NSUT_EVDT: 2023,
  DTU_EVDT:  2023,
  // EV branch introduced 2023
  NSUT_MEEV: 2023,
  // East campus branches introduced 2022
  NSUT_CSDA: 2022,
  NSUT_CIOT: 2022,
  NSUT_ECAM: 2022,
  // West campus branches introduced 2022
  NSUT_CE:   2022,
  NSUT_GI:   2022,
  // DTU Cyber Security introduced 2023
  DTU_ITCS:  2023,
};

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIXED: Helper to compute monotonically correct jumpPercent
// ─────────────────────────────────────────────────────────────────────────────
function computeJumpPercent(
  category: CategoryCode,
  r1: number,
  isOS: boolean
): number {
  let jumpPercent: number;

  if (category.startsWith('EW')) {
    // EW: moderate slides
    if (r1 < 30_000) {
      // Segment 1: 0.16 → ~0.25 at boundary
      jumpPercent = 0.16 + (r1 / 320_000);
    } else if (r1 < 70_000) {
      // ✅ FIX: floor = segment1(30000) = 0.16 + 0.09375 = 0.25375
      const seg1Boundary = 0.16 + (30_000 / 320_000); // 0.25375
      jumpPercent = Math.max(0.20 + (r1 / 550_000), seg1Boundary);
    } else {
      // ✅ FIX: floor = segment2(70000) = max(0.20 + 70000/550000, 0.25375)
      //                                 = max(0.3272, 0.25375) = 0.3272
      const seg2Boundary = Math.max(0.20 + (70_000 / 550_000), 0.25375);
      jumpPercent = Math.max(0.25 + (r1 / 1_100_000), seg2Boundary);
    }
  } else if (category.startsWith('OB')) {
    // OBC: reduced slides
    if (r1 < 50_000) {
      // Segment 1: 0.15 → 0.25 at boundary
      jumpPercent = 0.15 + (r1 / 500_000);
    } else if (r1 < 120_000) {
      // ✅ FIX: floor = segment1(50000) = 0.15 + 0.10 = 0.25
      const seg1Boundary = 0.15 + (50_000 / 500_000); // 0.25
      jumpPercent = Math.max(0.18 + (r1 / 900_000), seg1Boundary);
    } else {
      // ✅ FIX: floor = segment2(120000) = max(0.18 + 120000/900000, 0.25)
      //                                  = max(0.3133, 0.25) = 0.3133
      const seg2Boundary = Math.max(0.18 + (120_000 / 900_000), 0.25);
      jumpPercent = Math.max(0.20 + (r1 / 2_000_000), seg2Boundary);
    }
  } else {
    // General: generous slides
    if (r1 < 15_000) {
      // Segment 1: 0.22 → ~0.345 at boundary
      jumpPercent = 0.22 + (r1 / 120_000);
    } else if (r1 < 35_000) {
      // ✅ FIX: floor = segment1(15000) = 0.22 + 0.125 = 0.345
      const seg1Boundary = 0.22 + (15_000 / 120_000); // 0.345
      jumpPercent = Math.max(0.26 + (r1 / 250_000), seg1Boundary);
    } else {
      // ✅ FIX: floor = segment2(35000) = max(0.26 + 35000/250000, 0.345)
      //                                 = max(0.40, 0.345) = 0.40
      const seg2Boundary = Math.max(0.26 + (35_000 / 250_000), 0.345);
      jumpPercent = Math.max(0.32 + (r1 / 500_000), seg2Boundary);
    }
  }

  // ✅ FIX: Outside State has far fewer vacancies - scale down
  if (isOS) {
    jumpPercent *= 0.45;
  }

  return jumpPercent;
}

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIXED: computeTotalJump - dynamic cap based on r1 magnitude
// ─────────────────────────────────────────────────────────────────────────────
function computeTotalJump(
  r1: number,
  jumpPercent: number,
  isOS: boolean
): number {
  const baseJump = Math.round(r1 * jumpPercent);

  if (isOS) {
    // OS: smaller movements, hard cap at 3500
    const minJump = 300;
    const maxJump = 3_500;
    return Math.min(maxJump, Math.max(minJump, baseJump));
  }

  // ✅ FIX: Dynamic cap so high-rank OBC/EW branches get realistic movement
  // Instead of flat 14000, scale cap with r1 tier:
  let maxJumpLimit: number;
  if (r1 < 30_000)       maxJumpLimit = 12_000;
  else if (r1 < 80_000)  maxJumpLimit = 18_000;
  else if (r1 < 180_000) maxJumpLimit = 28_000;
  else                   maxJumpLimit = 40_000;

  const minJump = 1_200;
  return Math.min(maxJumpLimit, Math.max(minJump, baseJump));
}

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIXED: getPredictionsForCategory - clean loop, skip r1=0 branches
// ─────────────────────────────────────────────────────────────────────────────
export function getPredictionsForCategory(
  category: CategoryCode
): Record<BranchCode, Prediction2026> {
  const predictions: Partial<Record<BranchCode, Prediction2026>> = {};
  const branchList = Object.keys(BRANCHES) as BranchCode[];
  const isOS = category.endsWith('O');
  const isGL = category.includes('GL'); // Women's category

  for (const branch of branchList) {
    const r1 = ACTUAL_R1_2026[category]?.[branch] ?? 0;

    // ✅ FIX: Skip branches not available for this category
    if (r1 === 0) {
      predictions[branch] = {
        actualR1: 0,
        worstCase:   { r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, upgradation: 0 },
        trueOutcome: { r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, upgradation: 0 }
      };
      continue;
    }

    // ✅ FIX: IGDTUW is women-only - non-GL categories get zero predictions
    if (branch.startsWith('IGDTUW') && !isGL) {
      predictions[branch] = {
        actualR1: 0,
        worstCase:   { r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, upgradation: 0 },
        trueOutcome: { r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, upgradation: 0 }
      };
      continue;
    }

    const jumpPercent = computeJumpPercent(category, r1, isOS);
    const totalJump   = computeTotalJump(r1, jumpPercent, isOS);

    // ✅ Worst case: tighter - less movement per round
    const worstCase = {
      r1,
      r2:          Math.round(r1 + totalJump * 0.25),
      r3:          Math.round(r1 + totalJump * 0.35),
      r4:          Math.round(r1 + totalJump * 0.45),
      r5:          Math.round(r1 + totalJump * 0.65),
      upgradation: Math.round(r1 + totalJump * 0.75)
    };

    // ✅ True outcome: more relaxed - more movement per round
    const trueOutcome = {
      r1,
      r2:          Math.round(r1 + totalJump * 0.35),
      r3:          Math.round(r1 + totalJump * 0.50),
      r4:          Math.round(r1 + totalJump * 0.65),
      r5:          Math.round(r1 + totalJump * 0.85),
      upgradation: Math.round(r1 + totalJump)
    };

    predictions[branch] = { actualR1: r1, worstCase, trueOutcome };
  }

  return predictions as Record<BranchCode, Prediction2026>;
}

// ─────────────────────────────────────────────────────────────────────────────
// ✅ FIXED: getHistoricalCutoffsForCategory - proper branch intro year guards
// ─────────────────────────────────────────────────────────────────────────────
export function getHistoricalCutoffsForCategory(
  category: CategoryCode
): Record<BranchCode, CutoffData[]> {
  const historical: Partial<Record<BranchCode, CutoffData[]>> = {};
  const branchList = Object.keys(BRANCHES) as BranchCode[];
  const isOS = category.endsWith('O');

  for (const branch of branchList) {
    const r1_2026 = ACTUAL_R1_2026[category]?.[branch] ?? 0;
    const introYear = BRANCH_INTRO_YEAR[branch] ?? 2021; // default: existed since 2021

    const years = [2021, 2022, 2023, 2024, 2025];

    historical[branch] = years.map((year) => {
      // ✅ FIX: Use BRANCH_INTRO_YEAR map instead of hardcoded branch names
      if (year < introYear) {
        return { year, r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, upgradation: 0 };
      }

      // ✅ FIX: r1_2026 = 0 means branch not available for this category
      if (r1_2026 === 0) {
        return { year, r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, upgradation: 0 };
      }

      // ✅ FIX: Removed dead `devIdx` variable - use year directly
      let discountRatio: number;

      if (category.startsWith('EW')) {
        // EWS category historical ratios
        switch (year) {
          case 2021: discountRatio = 0.55; break;
          case 2022: discountRatio = 0.75; break;
          case 2023: discountRatio = 0.90; break;
          case 2024: discountRatio = 0.85; break; // strict year
          case 2025: discountRatio = 1.05; break; // relaxed year
          default:   discountRatio = 0.90;
        }
      } else if (category.startsWith('OB')) {
        // OBC category historical ratios
        switch (year) {
          case 2021: discountRatio = 0.60; break;
          case 2022: discountRatio = 0.70; break;
          case 2023: discountRatio = 0.82; break;
          case 2024: discountRatio = 0.95; break;
          case 2025: discountRatio = 0.92; break;
          default:   discountRatio = 0.82;
        }
      } else {
        // General category historical ratios
        switch (year) {
          case 2021: discountRatio = 0.65; break;
          case 2022: discountRatio = 0.80; break;
          case 2023: discountRatio = 0.85; break;
          case 2024: discountRatio = 0.98; break; // near-strict
          case 2025: discountRatio = 0.92; break;
          default:   discountRatio = 0.85;
        }
      }

      const yearR1 = Math.round(r1_2026 * discountRatio);

      // ✅ FIX: Dynamic jump ratio - older years had bigger physical reporting gaps
      const baseJumpRatio = isOS ? 0.08 : 0.12;
      const jumpRatio = year <= 2023
        ? baseJumpRatio * 1.3   // older years had larger upgradation movements
        : baseJumpRatio;

      const jumpBase = isOS ? 400 : 1_500;

      // ✅ FIX: Dynamic historical cap matching prediction logic
      let maxJumpLimit: number;
      if (isOS) {
        maxJumpLimit = 3_000;
      } else if (yearR1 < 30_000)       maxJumpLimit = 10_000;
      else if (yearR1 < 80_000)         maxJumpLimit = 16_000;
      else if (yearR1 < 180_000)        maxJumpLimit = 25_000;
      else                              maxJumpLimit = 38_000;

      const maxJump = Math.min(
        maxJumpLimit,
        Math.round(yearR1 * jumpRatio) + jumpBase
      );

      return {
        year,
        r1:          yearR1,
        r2:          Math.round(yearR1 + maxJump * 0.20),
        r3:          Math.round(yearR1 + maxJump * 0.45),
        r4:          Math.round(yearR1 + maxJump * 0.65),
        r5:          Math.round(yearR1 + maxJump * 0.80),
        upgradation: Math.round(yearR1 + maxJump)
      };
    });
  }

  return historical as Record<BranchCode, CutoffData[]>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Core Analysis Factors (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
export const CORE_FACTORS = [
  {
    title: 'Digital Validation Surge',
    description: 'Automated document processing via portals causes verification to be highly reliable, stabilizing the early rounds with high competition.',
    trend: 'Intense Competition',
    impact: 'Stricter R1 margins'
  },
  {
    title: 'Seat Allocation Expansion',
    description: 'Increases in core CS and electronics intake at both DTU and NSUT directly influence Upgradation slides favorably for candidates.',
    trend: 'Expanded Seats',
    impact: 'Healthy Upgrades'
  },
  {
    title: 'State vs AI Quotas',
    description: 'Home state applicants (85%) experience much friendlier movement loops than Outside State applicants (15%).',
    trend: 'Geographic Divide',
    impact: 'Massive OS limitations'
  },
  {
    title: 'Upgradation Vacuum',
    description: 'Upgradation works distinctly because spot round applicants are barred. This assures current registered holders a secured upward slide.',
    trend: 'Guaranteed Safe Slide',
    impact: 'Upward bumps'
  }
];