import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  thresholds: {
    'failed requests': ['rate<0.1'],
    'http_req_duration': ['p(95)<100']
  },
  stages: [
    { duration: '10s', target: 100 }, // ramp to 100 RPS in 10s
    { duration: '20s', target: 100 }, // hold 100 RPS for 20s
    // { duration: '30s', target: 1000 }, // ramp to 1000 RPS over 30s
    // { duration: '8m', target: 1000 }, // hold 1000 RPS for 8m
    { duration: '30s', target: 100 }, // taper to 100 RPS over 30s
    { duration: '20s', target: 100 }, // hold 100 RPS for 20s
    { duration: '10s', target: 0 }, // taper to 0 over 10s
  ],
}

export default function() {
  let gameID;
  let weightNum = Math.random();
  if (weightNum < 0.8) {
    gameID = Math.floor(Math.random() * (10000000 - 8000000 + 1)) + 8000000
  } else {
    gameID = Math.floor(Math.random() * (7999999)) + 1
  }
  http.get(`http://localhost:3000/games/${gameID}`, {
    tags: { name: 'k6Testing' }
  });

  sleep(1);
}