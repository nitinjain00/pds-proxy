export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { fpsId, month, year } = req.query;
  if (!fpsId || !month || !year) return res.status(400).json({ error: 'Missing params' });
  const govtUrl = `https://smartpds.up.gov.in/Epos_Spring/fps/fpstransaction?fpsId=${fpsId}&month=${month}&year=${year}`;
  try {
    const response = await fetch(govtUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://smartpds.up.gov.in/',
        'Origin': 'https://smartpds.up.gov.in',
      }
    });
    if (!response.ok) return res.status(response.status).json({ error: `Govt API error ${response.status}` });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
