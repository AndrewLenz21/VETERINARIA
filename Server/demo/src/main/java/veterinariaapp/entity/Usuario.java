package veterinariaapp.entity;
//OBJETO PRINCIPAL
public class Usuario {
    // Clase interna UsuarioCredentials
    public static class UsuarioCredentials {
        private String email;
        private String password;

        // Getters y setters
        // Obtener y Modificar email o contraseña

        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }
    
}