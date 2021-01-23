import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Form, Input, Row, Table } from 'reactstrap';
import {
  getPosts,
  createPost,
  destroyPost,
} from '../features/posts/postsSlice';

// eslint-disable-next-line react-hooks/exhaustive-deps

export default function Posts() {
  const posts = useSelector((state) => state.posts.postList);
  const [postList, setPostList] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onNewPostSubmit = (e) => {
    e.preventDefault();
    if (posts.map((post) => post.name).includes(name)) return;
    dispatch(createPost({ name, description })).then(() => {
      setName('');
      setDescription('');
    });
  };

  const deletePostWithId = (postId) => {
    dispatch(destroyPost(postId)).then(() => {
      setSearch('');
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getPosts()), []);

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setPostList(
      posts.filter(
        (post) =>
          !search ||
          post.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    );
  };

  return (
    <Container>
      <Form onSubmit={onSearchSubmit}>
        <Row className="mt-2">
          <Col xs="7" sm="5">
            <Input
              type="search"
              placeholder="Filtro de nombre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col sm="4" className="d-none d-sm-block" />
          <Col xs="5" sm="3">
            <Button type="submit" block color="primary">
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="mt-2">
        <Col xs="12">
          <Table striped>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Nombre</th>
                <th style={{ width: '58.33%' }}>Descripción</th>
                <th style={{ width: '16.67%' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {postList.map((post) => (
                <tr key={post.id}>
                  <td style={{ width: '25%' }}>{post.name}</td>
                  <td style={{ width: '58.33%' }}>{post.description}</td>
                  <td style={{ width: '16.67%' }}>
                    <Button
                      block
                      color="danger"
                      onClick={() => deletePostWithId(post.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Form onSubmit={onNewPostSubmit}>
        <Row className="mt-2">
          <Col xs="12" sm="3">
            <Input
              className="mb-1"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col xs="12" sm="6">
            <Input
              className="mb-1"
              type="text"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col xs="12" sm="3">
            <Button
              type="submit"
              block
              color="success"
              disabled={!name || !description}
            >
              Crear
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
