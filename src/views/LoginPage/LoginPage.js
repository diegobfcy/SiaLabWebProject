import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ErrorModal from '../../components/modals/ErrorModal/ErrorModal';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error
        try {
            await login(email, password);
            navigate('/main'); // Redirige a la página principal después del inicio de sesión exitoso
        } catch (error) {
            if (error.message === "Nombre de usuario o contraseña incorrectos") {
                setError(error.message);
            } else {
                setErrorMessage(error.message);
                setShowErrorModal(true);
            }
        }
    };

    const goToRegisterPage = () => {
        navigate('/register'); // Navega a la página de registro
    };

    const goToResetPasswordPage = () => {
        navigate('/reset-password'); // Navega a la página de recuperación de contraseña
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setErrorMessage('');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail">
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

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <Button variant="primary" type="submit" className="w-100 mt-4">
                            Iniciar Sesión
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <Button variant="link" className="p-0" onClick={goToRegisterPage}>
                            ¿No tienes una cuenta? Regístrate
                        </Button>
                    </div>
                    <div className="text-center mt-2">
                        <Button variant="link" className="p-0" onClick={goToResetPasswordPage}>
                            ¿Olvidaste tu contraseña?
                        </Button>
                    </div>
                </Col>
            </Row>
            <ErrorModal 
                show={showErrorModal} 
                handleClose={handleCloseErrorModal} 
                message={errorMessage} 
            />
        </Container>
    );
};

export default LoginPage;
