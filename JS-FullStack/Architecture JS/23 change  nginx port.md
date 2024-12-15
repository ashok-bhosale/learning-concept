Yes, you can configure NGINX to run on a different port if port 80 is already occupied (e.g., by IIS). Here's how to do it:

---

### **Steps to Change NGINX Listening Port**

1. **Locate the NGINX Configuration File**:
    
    - The configuration file is usually located in `C:\nginx\conf\nginx.conf`.
2. **Open the Configuration File**:
    
    - Open `nginx.conf` with a text editor like Notepad or Visual Studio Code.
3. **Modify the `listen` Directive**:
    
    - Find the `server` block in the configuration file:
        
        ```nginx
        server {
            listen 80;
            ...
        }
        ```
        
    - Change the `listen` directive to a different port, for example, port `8080`:
        
        ```nginx
        server {
            listen 8080;
            ...
        }
        ```
        
4. **Save the Configuration**:
    
    - Save the file after making the changes.
5. **Restart NGINX**:
    
    - Open Command Prompt, navigate to the NGINX directory, and run the following command to reload the configuration:
        
        ```cmd
        nginx.exe -s reload
        ```
        
6. **Access NGINX on the New Port**:
    
    - You can now access NGINX using the new port, e.g., `http://localhost:8080`.

---

### **Check Port Availability**

To ensure the new port (e.g., 8080) is not already in use, you can check which ports are currently active:

1. Open Command Prompt.
2. Run:
    
    ```cmd
    netstat -ano | findstr :8080
    ```
    
    - If no process is listed, the port is free.

---

### **Disable IIS (Optional)**

If you want to use port 80 for NGINX and don't need IIS:

1. Stop IIS temporarily:
    - Open Command Prompt as Administrator and run:
        
        ```cmd
        iisreset /stop
        ```
        
2. Disable IIS permanently:
    - Go to **Services** → Find `World Wide Web Publishing Service (W3SVC)` → Stop and set it to **Disabled**.

---

### Summary

You can run NGINX on any available port (e.g., 8080) by modifying the `listen` directive in `nginx.conf`. If port 80 is essential, you can stop IIS or disable it entirely to free up the port.