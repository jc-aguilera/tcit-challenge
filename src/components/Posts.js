import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Container, Input, Row, Table } from 'reactstrap'
import { getPosts, createPost, destroyPost } from '../features/posts/postsSlice';

export default function Posts() {

  const posts = useSelector(state => state.posts.postList);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <Container>
      <Row>
        <Col xs="4">
          <Input
            type="search"
            placeholder="Filtro de nombre"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
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
            {
              posts.map((post) => (
                <tr key={post.id}>
                  <td style={{ width: '25%'}}>{post.name}</td>
                  <td style={{ width: '58.33%'}}>{post.description}</td>
                  <td style={{ width: '16.67%'}}>
                    <Button
                      block
                      color="danger"
                      onClick={() => dispatch(destroyPost(post.id))}>Eliminar</Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col xs="3">
          <Input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Col>
        <Col xs="7">
          <Input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Col>
        <Col xs="2">
          <Button
            block
            color="success"
            disabled={!name || !description}
            onClick={() => dispatch(createPost({ name, description }))}
            >Crear</Button>
        </Col>
      </Row>
    </Container>
  )
}
