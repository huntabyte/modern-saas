import {sparkAPI} from "$env/static/private"
export const GET = async ({ request, url }) => {

  const res = await fetch('https://replication.sparkapi.com/v1/listings',{
    headers: {
      Authorization: `Bearer ${sparkAPI}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json()

  
  return new Response(JSON.stringify(data), { status: 200 })
}
