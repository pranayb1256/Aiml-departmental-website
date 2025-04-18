import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Link,
} from "@mui/material";
import toast from "react-hot-toast";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [credentials, setCredentials] = useState({
    fullname: "",
    email: "",
    password: "",
    adminId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!credentials.email || !credentials.password || !credentials.adminId || (isRegister && !credentials.fullname)) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      // Get the backend URL from the environment variable
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log("API URL: ", apiUrl);  // Log the API URL to check if it's loaded correctly

      // Ensure that the API URL is defined and not undefined
      if (!apiUrl) {
        setError("API URL is not defined. Please check the environment variable.");
        setLoading(false);
        return;
      }

      const endpoint = isRegister ? `${apiUrl}/admin/register` : `${apiUrl}/admin/login`;

      // Call the backend endpoint
      const res = await axios.post(endpoint, credentials);

      if (res.data.success) {
        if (isRegister) {
          setIsRegister(false); // Switch to login after successful registration
        } else {
          localStorage.setItem("token", res.data.token);
          toast.success("Admin logged in successfully!");
          navigate("/dashboard");
        }
      } else {
        setError(res.data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Card sx={{ width: 400, padding: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            {isRegister ? "Admin Register" : "Admin Login"}
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {isRegister && (
              <TextField
                label="Full Name"
                fullWidth
                margin="normal"
                value={credentials.fullname}
                onChange={(e) => setCredentials({ ...credentials, fullname: e.target.value })}
              />
            )}
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value.trim() })}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <TextField
              label="Admin ID"
              fullWidth
              margin="normal"
              value={credentials.adminId}
              onChange={(e) => setCredentials({ ...credentials, adminId: e.target.value })}
            />
            {error && (
              <Typography color="error" textAlign="center" mt={1}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              type="submit"
              disabled={loading || !credentials.email || !credentials.password || !credentials.adminId || (isRegister && !credentials.fullname)}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : isRegister ? "Register" : "Login"}
            </Button>
          </form>
          <Typography textAlign="center" mt={2}>
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              component="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError(""); // Clear error when switching
                setCredentials({ fullname: "", email: "", password: "", adminId: "" }); // Reset fields
              }}
            >
              {isRegister ? "Login" : "Register"}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
