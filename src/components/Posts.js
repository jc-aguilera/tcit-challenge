import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Input, Row, Table } from 'reactstrap';
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

  const createNewPost = () => {
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

  const postFilter = (post) =>
    !search ||
    post.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getPosts()), []);

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  return (
    <Container>
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
          <Button
            block
            color="primary"
            onClick={() => setPostList(posts.filter(postFilter))}
          >
            Buscar
          </Button>
        </Col>
      </Row>
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
            block
            color="success"
            disabled={!name || !description}
            onClick={createNewPost}
          >
            Crear
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
