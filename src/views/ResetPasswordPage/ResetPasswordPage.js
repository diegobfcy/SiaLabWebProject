import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const { resetPassword } = useAuth();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(email);

            navigate('/');
        } catch (error) {
            console.log(`Error al solicitar la recuperación de contraseña: ${error.message}`);
        }
    };

    const goToLoginPage = () => {
        navigate('/');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <h2 className="text-center mb-4">Recuperar Contraseña</h2>
                    <Form onSubmit={handleResetPassword}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Ingresa tu correo" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-4">
                            Enviar Correo
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <Button variant="link" className="p-0" onClick={goToLoginPage}>
                            Volver al Inicio de Sesión
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPasswordPage;
