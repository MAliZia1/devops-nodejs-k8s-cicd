const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '2.0.0';
const APP_MESSAGE = process.env.APP_MESSAGE || 'Version 3 - Live Demo 🚀';

let visitorCount = 0;

app.get('/', (req, res) => {
  visitorCount++;
  const data = {
    title: 'DevOps Project - Node.js on AWS EKS/Minikube',
    student: 'M Ali Zia (78443)',
    message: APP_MESSAGE,
    version: APP_VERSION,
    timestamp: new Date().toISOString(),
    hostname: os.hostname(),
    platform: os.platform(),
    visitorCount: visitorCount,
  };
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>DevOps Project</title>
  <style>
    body { font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; }
    .card { background:#1e293b; border-radius:12px; padding:40px; max-width:600px; width:90%; box-shadow:0 4px 24px rgba(0,0,0,0.4); }
    h1 { color:#38bdf8; margin-top:0; }
    .badge { display:inline-block; background:#0ea5e9; color:#fff; border-radius:20px; padding:4px 14px; font-size:13px; margin-bottom:16px; }
    .row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #334155; }
    .row:last-child { border-bottom:none; }
    .label { color:#94a3b8; }
    .value { color:#f1f5f9; font-weight:bold; }
    .links { margin-top:20px; display:flex; gap:12px; }
    a { background:#0ea5e9; color:#fff; padding:8px 18px; border-radius:8px; text-decoration:none; font-size:14px; }
    a:hover { background:#0284c7; }
  </style>
</head>
<body>
  <div class="card">
    <h1>&#128640; ${data.title}</h1>
    <span class="badge">Student: ${data.student}</span>
    <div class="row"><span class="label">Message</span><span class="value">${data.message}</span></div>
    <div class="row"><span class="label">Version</span><span class="value">${data.version}</span></div>
    <div class="row"><span class="label">Timestamp</span><span class="value">${data.timestamp}</span></div>
    <div class="row"><span class="label">Container / Hostname</span><span class="value">${data.hostname}</span></div>
    <div class="row"><span class="label">Platform</span><span class="value">${data.platform}</span></div>
    <div class="row"><span class="label">Visitor Count</span><span class="value">${data.visitorCount}</span></div>
    <div class="links">
      <a href="/health">Health Check</a>
      <a href="/api/info">API Info</a>
    </div>
  </div>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    hostname: os.hostname(),
    version: APP_VERSION,
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'devops-nodejs-k8s-cicd',
    version: APP_VERSION,
    message: APP_MESSAGE,
    student: 'M Ali Zia (78443)',
    hostname: os.hostname(),
    platform: os.platform(),
    nodeVersion: process.version,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    visitorCount,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Version: ${APP_VERSION} | Message: ${APP_MESSAGE}`);
});
