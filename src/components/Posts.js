import React from 'react'
import { Button, Col, Container, Input, Row, Table } from 'reactstrap'

export default function Posts() {
  return (
    <Container>
      <Row>
        <Col xs="4">
          <Input type="search" />
        </Col>
        <Col xs="5" />
        <Col xs="3">
          <Button block color="primary">
            Buscar
          </Button>
        </Col>
      </Row>
      <Row>
        <Table striped>
          <thead>
            <tr>
              <th style={{ width: '25%'}}>Nombre</th>
              <th style={{ width: '58.33%'}}>Descripción</th>
              <th style={{ width: '16.67%'}}>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Post 1</td>
              <td>Hola cómo estás</td>
              <td>
                <Button block color="danger">Eliminar</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col xs="3">
          <Input type="text" placeholder="Nombre" />
        </Col>
        <Col xs="7">
          <Input type="text" placeholder="Descripción" />
        </Col>
        <Col xs="2">
          <Button block color="success">Crear</Button>
        </Col>
      </Row>
    </Container>
  )
}
