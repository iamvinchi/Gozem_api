import axios from 'axios'

export const getCoordinates = async(address:string) => {
    try {
        const url:any = process.env.GEO_CORDINATE_URL
        const apikey:any = process.env.GOOGLE_API_KEY
        const response = await axios.get(url, {
            params: {
                address: address,
                key: apikey
            },
        });
        const result = response.data.results[0];
        if (result) {
            const { lat, lng } = result.geometry.location;
            return {
                lat, lng
            }
        } else {
            console.log('No results found');
            return 'No results found'
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return `Error fetching data:, ${error}`
    }
}

