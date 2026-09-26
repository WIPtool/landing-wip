// /landing/sbs (rewrite en vercel.json): enlaces de la app vieja de SBS, que ya no está en Play Store
// pero la gente aún tiene instalada. Abren /landing/sbs?plate=<placa>; la página ya no existe.
// Se redirige a la portada con UTM "app_sbs_vieja" para verlo en Data Studio, sin pasar la placa
// (un dato personal que no debe quedar en Analytics ni en Clarity).
import { redirigir } from './_ga4.js';

export default function handler(req, res) {
  redirigir(res, '/?utm_source=app_sbs_vieja&utm_medium=app&utm_campaign=app_sbs_vieja');
}
