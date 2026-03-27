export default async function handler(req, res) {
  const path = req.query.path ?? '';
  const target = new URL(`https://api.football-data.org/v4/${path}`);

  // 쿼리스트링 전달 (status, limit 등)
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  reqUrl.searchParams.forEach((value, key) => {
    if (key !== 'path') target.searchParams.set(key, value);
  });

  const response = await fetch(target.toString(), {
    headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY ?? '' },
  });

  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(response.status).json(data);
}
