export default async function getVenue(id:string){
    const response = await fetch(`http://localhost:5000/api/v1/massageShops/${id}`);
    if(!response.ok){
        throw new Error('Failed to fetch massage shop')
    }

    return await response.json();
}