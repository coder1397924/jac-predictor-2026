export type BranchCode = 
  | 'NSUT_CSAI' | 'NSUT_CSE' | 'NSUT_CSDS' | 'NSUT_IT' | 'NSUT_ITNS' | 'NSUT_MAC' 
  | 'NSUT_ECE' | 'NSUT_EVDT' | 'NSUT_EE' | 'NSUT_ICE' | 'NSUT_ME' | 'NSUT_BT' 
  | 'NSUT_CSDA' | 'NSUT_CIOT' | 'NSUT_ECAM' | 'NSUT_MEEV' | 'NSUT_CE' | 'NSUT_GI'
  | 'DTU_COE' | 'DTU_CSDS' | 'DTU_IT' | 'DTU_ITCS' | 'DTU_SE' | 'DTU_MCE' | 'DTU_ECE' | 'DTU_EVDT' | 'DTU_EE' | 'DTU_ME'
  | 'DTU_MAE' | 'DTU_AE' | 'DTU_EP' | 'DTU_CH' | 'DTU_CE' | 'DTU_PIE' | 'DTU_ENE' | 'DTU_BT'
  | 'IIITD_CSAM' | 'IIITD_CSAI' | 'IIITD_CSD' | 'IIITD_CSSS' | 'IIITD_CSB' | 'IIITD_ECE' | 'IIITD_EVE' | 'IIITD_CSEcon' | 'IIITD_CSE'
  | 'IGDTUW_CSE' | 'IGDTUW_CSAI' | 'IGDTUW_IT' | 'IGDTUW_ECE' | 'IGDTUW_MEAM' | 'IGDTUW_DMAM';

export type CategoryCode = 'GNGND' | 'EWGND' | 'OBGND' | 'GNGNO' | 'EWGNO' | 'OBGNO' | 'GNGLD' | 'EWGLD' | 'OBGLD' | 'GNGLO' | 'EWGLO' | 'OBGLO';
export type CollegeCode = 'NSUT' | 'DTU' | 'IIITD' | 'IGDTUW' | 'ALL';

export interface BranchInfo {
  code: BranchCode;
  college: CollegeCode;
  name: string;
  campus: string;
  description: string;
  duration: string;
  intake: number;
}

export interface CutoffData {
  year: number;
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  r5: number;
  upgradation: number;
}

export interface PredictScenario {
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  r5: number;
  upgradation: number;
}

export interface Prediction2026 {
  worstCase: PredictScenario;
  trueOutcome: PredictScenario;
  actualR1: number;
}

export interface AnalysisSummary {
  title: string;
  description: string;
  impactType: 'increase' | 'decrease' | 'neutral';
  impactScale: 'High' | 'Medium' | 'Low';
}
