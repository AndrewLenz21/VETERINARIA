const DATA_SOURCE_URL = "http://localhost:8080";

class appveterinariaserver {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(path: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${path}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Leer la respuesta como texto y manejar el caso de respuesta vacía o nula
      const responseText = await response.text();
      const jsonResponse = responseText ? JSON.parse(responseText) : null;

      return jsonResponse;
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
      throw error;
    }
  }

  async getByte(path: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${path}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Leer la respuesta como un ArrayBuffer (contenido binario)
      const responseArrayBuffer = await response.arrayBuffer();

      return new Uint8Array(responseArrayBuffer); // Devuelve un arreglo de bytes
    } catch (error) {
      console.error("Error al realizar la solicitud GET (byte):", error);
      throw error;
    }
  }

  async post(path: string, object: any) {
    try {
      const response = await fetch(`${this.baseUrl}/${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Leer la respuesta como texto y manejar el caso de respuesta vacía o nula
      const responseText = await response.text();
      const jsonResponse = responseText ? JSON.parse(responseText) : null;

      return jsonResponse;
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
      throw error;
    }
  }
}
export default new appveterinariaserver(DATA_SOURCE_URL);
