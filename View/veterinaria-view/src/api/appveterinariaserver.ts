const DATA_SOURCE_URL = "http://localhost:8080"

class appveterinariaserver {
    private baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get(path: string) {
        try {
            const response = await fetch(`${this.baseUrl}/${path}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        } catch (error) {
            console.error('Error al realizar la solicitud GET:', error);
            throw error;
        }
    }

    async post(path: string, object: any) {
        try {
            const response = await fetch(`${this.baseUrl}/${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error);
            throw error;
        }
    }
    
}
export default new appveterinariaserver(DATA_SOURCE_URL);
