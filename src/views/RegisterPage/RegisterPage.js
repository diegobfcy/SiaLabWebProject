import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useAuth();
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setPasswordMatchError('Las contraseñas no coinciden');
      return;
    }
    try {
      await register({ username, email, password });
      navigate("/");
    } catch (error) {
      console.log(`Error al registrar: ${error.message}`);
    }
  };

  const goToLoginPage = () => {
    navigate("/");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Registrarse</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {passwordMatchError && (
              <Alert variant="danger">{passwordMatchError}</Alert>
            )}
            <Button variant="primary" type="submit" className="w-100 mt-4">
              Registrarse
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Button variant="link" className="p-0" onClick={goToLoginPage}>
              ¿Ya tienes una cuenta? Inicia Sesión
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
