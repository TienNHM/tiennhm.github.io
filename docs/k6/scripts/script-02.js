import http from 'k6/http';
import { sleep } from 'k6';

function createUser() {
  const url = 'https://reqres.in/api/users';
  const payload = JSON.stringify({
    name: 'morpheus',
    job: 'leader',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return http.post(url, payload, params);
}

function getUser(id) {
  const url = `https://reqres.in/api/users/${id}`;
  return http.get(url);
}

function updateUser(id) {
  const url = `https://reqres.in/api/users/${id}`;
  const payload = JSON.stringify({
    name: 'morpheus',
    job: 'zion resident',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return http.put(url, payload, params);
}

function deleteUser(id) {
  const url = `https://reqres.in/api/users/${id}`;
  return http.del(url);
}

export default function () {
  const user = createUser();
  const id = user.json('id');
  sleep(1);
  getUser(id);
  sleep(1);
  updateUser(id);
  sleep(1);
  deleteUser(id);
  sleep(1);
}