export interface WaterQualityStatus {
  pH: number;
  turbidity: number;
  temperature: number;
  tds: number;
  chlorineLevel: number;
  status: "normal" | "warning" | "danger";
}

export interface WaterQualityAverages {
  pH: number;
  turbidity: number;
  temperature: number;
  tds: number;
  chlorineLevel: number;
  date: string; // optional
}
