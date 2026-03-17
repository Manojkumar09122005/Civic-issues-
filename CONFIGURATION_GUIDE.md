# CIVIC Platform Configuration Guide

## Network Setup for Cross-Computer Usage

When running the frontend on a different computer than the backend services, you need to configure the IP addresses correctly.

## Step 1: Find Your Backend Server IP Address

On the computer running the backend services, find its IP address:

### Windows:
1. Open Command Prompt
2. Run: `ipconfig`
3. Look for your network adapter's IPv4 Address (usually something like `192.168.x.x`)

### Mac/Linux:
1. Open Terminal
2. Run: `ifconfig` or `ip addr`
3. Look for your network adapter's IP address

## Step 2: Configure the Frontend

Update the [.env](file:///c:/Users/manoj/Desktop/SIHPROJECT/CIVIC_FULLPROJECT@08/CIVIC_2/CIVIC/.env) file in your frontend project:

```
# Replace BACKEND_SERVER_IP with the actual IP address of your backend server
# For example, if your backend server IP is 192.168.1.100:

REACT_APP_API_URL=http://192.168.1.100:8000/api
REACT_APP_ML_API_URL=http://192.168.1.100:8001
```

## Step 3: Update CORS Settings (Backend)

Make sure the backend allows requests from your frontend IP. In [civic_backend/settings.py](file:///c:/Users/manoj/Desktop/SIHPROJECT/CIVIC_FULLPROJECT@08/CIVIC_2/CIVIC/backend/civic_backend/settings.py):

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://YOUR_FRONTEND_IP:3000",  # Add this line with actual frontend IP
]
```

## Step 4: Ensure Firewall Settings

Make sure your firewall allows connections on ports:
- 8000 (Government Backend)
- 8001 (User Backend and ML Service)

## Step 5: Restart Services

1. Restart the backend services
2. Rebuild and restart the frontend

## Troubleshooting

If you still get connection errors:

1. **Ping test**: From the frontend computer, try pinging the backend server:
   ```
   ping BACKEND_SERVER_IP
   ```

2. **Port test**: Check if the ports are accessible:
   ```
   telnet BACKEND_SERVER_IP 8001
   ```

3. **Browser security**: If using HTTPS on the frontend, you might need to allow mixed content or configure SSL for the backend.

4. **Network isolation**: Make sure both computers are on the same network or that the network allows the required connections.