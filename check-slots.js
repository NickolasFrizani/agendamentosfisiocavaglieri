// Vercel Serverless Function — proxy para Google Apps Script
// Resolve o problema de CORS do navegador

export default async function handler(req, res) {
  // Headers CORS para o site poder chamar
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'date parameter required' });
  }

  try {
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbwvPRT4bgzkPIsOYVg4p5twBlnhAeD__1s-m8aRKugOP0wXLDgHjDp4dgb_ctG1Hhr9xQ/exec';

    const response = await fetch(`${GAS_URL}?date=${date}`, {
      redirect: 'follow',
      headers: { 'Accept': 'application/json' }
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(200).json({ busySlots: [] });
  }
}
