
async function quotes()
{
await fetch("https://api.api-ninjas.com/v1/quotes?category=life", {
  headers: { "X-Api-Key": process.env.X-Api-Key }
})
  .then(res => res.json())
  .then(data => console.log(`${data[0].quote} — ${data[0].author}`));
}


export default quotes;