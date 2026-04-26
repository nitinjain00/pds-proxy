export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const fpsId = searchParams.get('fpsId');
  const month = searchParams.get('month');
  const year  = searchParams.get('year');

  if (!fpsId || !month || !year) {
    return new Response(JSON.stringify({ error: 'Missing params' }), { status: 400 });
  }

  const govtUrl = `https://smartpds.up.gov.in/Epos_Spring/fps/fpstransaction?fpsId=${fpsId}&month=${month}&year=${year}`;

  try {
    const res = await fetch(govtUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://smartpds.up.gov.in/',
        'Origin': 'https://smartpds.up.gov.in',
      }
    });
    const data = await res.text();
    return new Response(data, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
