// vite.config.js
import { defineConfig, loadEnv } from "file:///sessions/fervent-peaceful-ramanujan/mnt/Desktop/virtual-tryon-app/node_modules/vite/dist/node/index.js";
import react from "file:///sessions/fervent-peaceful-ramanujan/mnt/Desktop/virtual-tryon-app/node_modules/@vitejs/plugin-react/dist/index.js";
function claudeApiPlugin(env) {
  return {
    name: "claude-api",
    configureServer(server) {
      server.middlewares.use("/api/claude", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }
        let body = "";
        req.on("data", (chunk) => body += chunk);
        req.on("end", async () => {
          try {
            const { messages } = JSON.parse(body);
            const apiKey = env.VITE_ANTHROPIC_API_KEY;
            if (!apiKey) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: { message: "API Key no configurada en .env.local" } }));
              return;
            }
            const response = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                "x-api-key": apiKey.trim(),
                "anthropic-version": "2023-06-01"
              },
              body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 1024,
                messages
              })
            });
            const text = await response.text();
            res.statusCode = response.status;
            res.setHeader("content-type", "application/json");
            try {
              JSON.parse(text);
              res.end(text);
            } catch {
              res.end(JSON.stringify({ error: { message: text || `Error ${response.status}` } }));
            }
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: { message: err.message } }));
          }
        });
      });
    }
  };
}
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), claudeApiPlugin(env)]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2Vzc2lvbnMvZmVydmVudC1wZWFjZWZ1bC1yYW1hbnVqYW4vbW50L0Rlc2t0b3AvdmlydHVhbC10cnlvbi1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9zZXNzaW9ucy9mZXJ2ZW50LXBlYWNlZnVsLXJhbWFudWphbi9tbnQvRGVza3RvcC92aXJ0dWFsLXRyeW9uLWFwcC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vc2Vzc2lvbnMvZmVydmVudC1wZWFjZWZ1bC1yYW1hbnVqYW4vbW50L0Rlc2t0b3AvdmlydHVhbC10cnlvbi1hcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG4vLyBQbHVnaW4gcXVlIG1hbmVqYSAvYXBpL2NsYXVkZSBkaXJlY3RhbWVudGUgZGVudHJvIGRlIFZpdGUuXG4vLyBVbiBzb2xvIHByb2Nlc286IHNpbiBwcm94eSwgc2luIENPUlMsIHNpbiBzZXJ2aWRvciBzZXBhcmFkby5cbmZ1bmN0aW9uIGNsYXVkZUFwaVBsdWdpbihlbnYpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnY2xhdWRlLWFwaScsXG4gICAgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgnL2FwaS9jbGF1ZGUnLCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcS5tZXRob2QgIT09ICdQT1NUJykge1xuICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDA1XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnTWV0aG9kIG5vdCBhbGxvd2VkJyB9KSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExlZXIgZWwgYm9keVxuICAgICAgICBsZXQgYm9keSA9ICcnXG4gICAgICAgIHJlcS5vbignZGF0YScsIChjaHVuaykgPT4gKGJvZHkgKz0gY2h1bmspKVxuICAgICAgICByZXEub24oJ2VuZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBtZXNzYWdlcyB9ID0gSlNPTi5wYXJzZShib2R5KVxuICAgICAgICAgICAgY29uc3QgYXBpS2V5ID0gZW52LlZJVEVfQU5USFJPUElDX0FQSV9LRVlcblxuICAgICAgICAgICAgaWYgKCFhcGlLZXkpIHtcbiAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA1MDBcbiAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiB7IG1lc3NhZ2U6ICdBUEkgS2V5IG5vIGNvbmZpZ3VyYWRhIGVuIC5lbnYubG9jYWwnIH0gfSkpXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS5hbnRocm9waWMuY29tL3YxL21lc3NhZ2VzJywge1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ3gtYXBpLWtleSc6IGFwaUtleS50cmltKCksXG4gICAgICAgICAgICAgICAgJ2FudGhyb3BpYy12ZXJzaW9uJzogJzIwMjMtMDYtMDEnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgbW9kZWw6ICdjbGF1ZGUtMy01LXNvbm5ldC0yMDI0MTAyMicsXG4gICAgICAgICAgICAgICAgbWF4X3Rva2VuczogMTAyNCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpXG4gICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICAgICAgICAgICAgLy8gU2kgQW50aHJvcGljIGRldnVlbHZlIHRleHRvIHBsYW5vIChlajogXCJVbmF1dGhvcml6ZWRcIiksIGxvIGVudm9sdmVtb3MgZW4gSlNPTlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgSlNPTi5wYXJzZSh0ZXh0KVxuICAgICAgICAgICAgICByZXMuZW5kKHRleHQpXG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiB7IG1lc3NhZ2U6IHRleHQgfHwgYEVycm9yICR7cmVzcG9uc2Uuc3RhdHVzfWAgfSB9KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNTAwXG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSB9KSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKVxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtyZWFjdCgpLCBjbGF1ZGVBcGlQbHVnaW4oZW52KV0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdYLFNBQVMsY0FBYyxlQUFlO0FBQzlaLE9BQU8sV0FBVztBQUlsQixTQUFTLGdCQUFnQixLQUFLO0FBQzVCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGdCQUFnQixRQUFRO0FBQ3RCLGFBQU8sWUFBWSxJQUFJLGVBQWUsT0FBTyxLQUFLLFFBQVE7QUFDeEQsWUFBSSxJQUFJLFdBQVcsUUFBUTtBQUN6QixjQUFJLGFBQWE7QUFDakIsY0FBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8scUJBQXFCLENBQUMsQ0FBQztBQUN2RDtBQUFBLFFBQ0Y7QUFHQSxZQUFJLE9BQU87QUFDWCxZQUFJLEdBQUcsUUFBUSxDQUFDLFVBQVcsUUFBUSxLQUFNO0FBQ3pDLFlBQUksR0FBRyxPQUFPLFlBQVk7QUFDeEIsY0FBSTtBQUNGLGtCQUFNLEVBQUUsU0FBUyxJQUFJLEtBQUssTUFBTSxJQUFJO0FBQ3BDLGtCQUFNLFNBQVMsSUFBSTtBQUVuQixnQkFBSSxDQUFDLFFBQVE7QUFDWCxrQkFBSSxhQUFhO0FBQ2pCLGtCQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsdUNBQXVDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RGO0FBQUEsWUFDRjtBQUVBLGtCQUFNLFdBQVcsTUFBTSxNQUFNLHlDQUF5QztBQUFBLGNBQ3BFLFFBQVE7QUFBQSxjQUNSLFNBQVM7QUFBQSxnQkFDUCxnQkFBZ0I7QUFBQSxnQkFDaEIsYUFBYSxPQUFPLEtBQUs7QUFBQSxnQkFDekIscUJBQXFCO0FBQUEsY0FDdkI7QUFBQSxjQUNBLE1BQU0sS0FBSyxVQUFVO0FBQUEsZ0JBQ25CLE9BQU87QUFBQSxnQkFDUCxZQUFZO0FBQUEsZ0JBQ1o7QUFBQSxjQUNGLENBQUM7QUFBQSxZQUNILENBQUM7QUFFRCxrQkFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2pDLGdCQUFJLGFBQWEsU0FBUztBQUMxQixnQkFBSSxVQUFVLGdCQUFnQixrQkFBa0I7QUFFaEQsZ0JBQUk7QUFDRixtQkFBSyxNQUFNLElBQUk7QUFDZixrQkFBSSxJQUFJLElBQUk7QUFBQSxZQUNkLFFBQVE7QUFDTixrQkFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUFTLFFBQVEsU0FBUyxTQUFTLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztBQUFBLFlBQ3BGO0FBQUEsVUFDRixTQUFTLEtBQUs7QUFDWixnQkFBSSxhQUFhO0FBQ2pCLGdCQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQUEsVUFDN0Q7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNILENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLEdBQUcsQ0FBQztBQUFBLEVBQ3pDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
