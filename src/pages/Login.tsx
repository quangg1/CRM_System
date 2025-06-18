import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Paper,
  Container,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Business,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  company: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
  });

  // Log page view and component mount
  useEffect(() => {
    console.log("📄 PAGE VIEW: Login Page", {
      timestamp: new Date().toLocaleString('vi-VN'),
      url: window.location.href
    });
    console.log("🎯 COMPONENT MOUNT: Login", { 
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toLocaleString('vi-VN')
    });

    return () => {
      console.log("🗑️ COMPONENT UNMOUNT: Login", {
        timestamp: new Date().toLocaleString('vi-VN')
      });
    };
  }, []);

  // Log mode changes
  useEffect(() => {
    console.log("👤 USER ACTION: Mode Changed", {
      mode: isLogin ? "login" : "register",
      timestamp: new Date().toLocaleString('vi-VN')
    });
  }, [isLogin]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const startTime = performance.now();

    console.log("ℹ️ INFO: Login Attempt Started", {
      email: loginForm.email,
      hasPassword: !!loginForm.password,
      passwordLength: loginForm.password.length,
      timestamp: new Date().toLocaleString('vi-VN')
    });

    setLoading(true);
    setError("");

    try {
      // Validate form data
      if (!loginForm.email || !loginForm.password) {
        const errorMsg = "Email và mật khẩu không được để trống";
        console.warn("❌ VALIDATION ERROR: login-form", {
          error: errorMsg,
          missingEmail: !loginForm.email,
          missingPassword: !loginForm.password,
          timestamp: new Date().toLocaleString('vi-VN')
        });
        setError(errorMsg);
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginForm.email)) {
        const errorMsg = "Định dạng email không hợp lệ";
        console.warn("❌ VALIDATION ERROR: email", {
          error: errorMsg,
          value: loginForm.email,
          timestamp: new Date().toLocaleString('vi-VN')
        });
        setError(errorMsg);
        return;
      }

      console.log("🔍 DEBUG: Login validation passed", {
        email: loginForm.email,
        passwordLength: loginForm.password.length,
        timestamp: new Date().toLocaleString('vi-VN')
      });

      // Use real authentication service
      try {
        const user = await authService.login({
          email: loginForm.email,
          password: loginForm.password,
        });

        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log("🔐 LOGIN ✅ SUCCESS", {
          email: loginForm.email,
          duration: `${duration.toFixed(2)}ms`,
          userAgent: navigator.userAgent,
          userId: user.id,
          userRole: user.role,
          timestamp: new Date().toLocaleString('vi-VN')
        });

        setSuccess("Đăng nhập thành công!");

        console.log("🔑 SESSION: User logged in", {
          userId: user.id,
          userRole: user.role,
          email: user.email,
          timestamp: new Date().toLocaleString('vi-VN')
        });

        const performanceStatus = duration > 3000 ? '🐌 SLOW' : '⚡ FAST';
        console.log(`${performanceStatus} PERFORMANCE: Login Process`, {
          duration: `${duration.toFixed(2)}ms`,
          email: loginForm.email,
          success: true,
          timestamp: new Date().toLocaleString('vi-VN')
        });

        console.log("👤 USER ACTION: Redirect to Dashboard", {
          userId: user.id,
          from: "/login",
          to: "/dashboard",
          timestamp: new Date().toLocaleString('vi-VN')
        });
        navigate("/dashboard");

      } catch (authError: any) {
        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log("🔐 LOGIN ❌ FAILED", {
          email: loginForm.email,
          duration: `${duration.toFixed(2)}ms`,
          reason: authError.message || "Authentication failed",
          timestamp: new Date().toLocaleString('vi-VN')
        });

        const errorMsg = authError.message || "Email hoặc mật khẩu không đúng";
        setError(errorMsg);

        console.warn("⚠️ WARNING: Authentication failed", {
          email: loginForm.email,
          duration: `${duration.toFixed(2)}ms`,
          error: authError.message,
          timestamp: new Date().toLocaleString('vi-VN')
        });
      }
    } catch (err: any) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      const errorMsg = "Đã xảy ra lỗi. Vui lòng thử lại.";

      console.error("🚨 ERROR [Login Submit]: Login failed", {
        error: err?.message || err,
        stack: err?.stack,
        timestamp: new Date().toLocaleString('vi-VN')
      });
      setError(errorMsg);
    } finally {
      setLoading(false);
      console.log("🔍 DEBUG: Login attempt completed", {
        email: loginForm.email,
        loading: false,
        timestamp: new Date().toLocaleString('vi-VN')
      });
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const startTime = performance.now();

    console.log("ℹ️ INFO: Registration Attempt Started", {
      email: registerForm.email,
      name: registerForm.name,
      company: registerForm.company,
      hasPassword: !!registerForm.password,
      passwordLength: registerForm.password.length,
      timestamp: new Date().toLocaleString('vi-VN')
    });

    setLoading(true);
    setError("");

    // Validation with logging
    if (registerForm.password !== registerForm.confirmPassword) {
      const errorMsg = "Mật khẩu xác nhận không khớp";
      console.warn("❌ VALIDATION ERROR: password-confirmation", {
        error: errorMsg,
        passwordLength: registerForm.password.length,
        confirmPasswordLength: registerForm.confirmPassword.length,
        timestamp: new Date().toLocaleString('vi-VN')
      });
      setError(errorMsg);
      setLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      const errorMsg = "Mật khẩu phải có ít nhất 6 ký tự";
      console.warn("❌ VALIDATION ERROR: password-length", {
        error: errorMsg,
        passwordLength: registerForm.password.length,
        minimumRequired: 6,
        timestamp: new Date().toLocaleString('vi-VN')
      });
      setError(errorMsg);
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      const errorMsg = "Định dạng email không hợp lệ";
      console.warn("❌ VALIDATION ERROR: email", {
        error: errorMsg,
        value: registerForm.email,
        timestamp: new Date().toLocaleString('vi-VN')
      });
      setError(errorMsg);
      setLoading(false);
      return;
    }

    // Name validation
    if (!registerForm.name.trim()) {
      const errorMsg = "Tên không được để trống";
      console.warn("❌ VALIDATION ERROR: name", {
        error: errorMsg,
        value: registerForm.name,
        timestamp: new Date().toLocaleString('vi-VN')
      });
      setError(errorMsg);
      setLoading(false);
      return;
    }

    try {
      console.log("🔍 DEBUG: Registration validation passed", {
        email: registerForm.email,
        name: registerForm.name,
        company: registerForm.company,
        passwordLength: registerForm.password.length,
        timestamp: new Date().toLocaleString('vi-VN')
      });

      // Use real authentication service
      try {
        const user = await authService.register({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
          company: registerForm.company,
        });

        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log("📝 REGISTER ✅ SUCCESS", {
          email: registerForm.email,
          name: registerForm.name,
          company: registerForm.company,
          duration: `${duration.toFixed(2)}ms`,
          userId: user.id,
          userRole: user.role,
          timestamp: new Date().toLocaleString('vi-VN')
        });

        const performanceStatus = duration > 3000 ? '🐌 SLOW' : '⚡ FAST';
        console.log(`${performanceStatus} PERFORMANCE: Registration Process`, {
          duration: `${duration.toFixed(2)}ms`,
          email: registerForm.email,
          success: true,
          timestamp: new Date().toLocaleString('vi-VN')
        });

        setSuccess("Đăng ký thành công! Đăng nhập tự động...");

        console.log("🔑 SESSION: User registered and logged in", {
          userId: user.id,
          userRole: user.role,
          email: user.email,
          timestamp: new Date().toLocaleString('vi-VN')
        });

        console.log("👤 USER ACTION: Redirect to Dashboard after registration", {
          userId: user.id,
          from: "/login",
          to: "/dashboard",
          timestamp: new Date().toLocaleString('vi-VN')
        });
        navigate("/dashboard");

      } catch (authError: any) {
        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log("📝 REGISTER ❌ FAILED", {
          email: registerForm.email,
          error: authError.message || "Registration failed",
          duration: `${duration.toFixed(2)}ms`,
          timestamp: new Date().toLocaleString('vi-VN')
        });

        const errorMsg = authError.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
        setError(errorMsg);

        console.error("🚨 ERROR [Registration Submit]: Registration failed", {
          error: authError?.message || authError,
          stack: authError?.stack,
          timestamp: new Date().toLocaleString('vi-VN')
        });
      }
    } catch (err: any) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      const errorMsg = "Đã xảy ra lỗi. Vui lòng thử lại.";

      console.error("🚨 ERROR [Registration Submit]: Registration unexpected error", {
        error: err?.message || err,
        stack: err?.stack,
        timestamp: new Date().toLocaleString('vi-VN')
      });
      setError(errorMsg);
    } finally {
      setLoading(false);
      console.log("🔍 DEBUG: Registration attempt completed", {
        email: registerForm.email,
        timestamp: new Date().toLocaleString('vi-VN')
      });
    }
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log("📝 FORM INPUT: login-" + name, {
      valueLength: typeof value === 'string' ? value.length : 'N/A',
      hasValue: !!value,
      timestamp: new Date().toLocaleString('vi-VN')
    });
    setLoginForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleRegisterInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    console.log("📝 FORM INPUT: register-" + name, {
      valueLength: typeof value === 'string' ? value.length : 'N/A',
      hasValue: !!value,
      timestamp: new Date().toLocaleString('vi-VN')
    });
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const toggleMode = () => {
    const newMode = !isLogin;

    console.log("👤 USER ACTION: Toggle Mode", {
      from: isLogin ? "login" : "register",
      to: newMode ? "login" : "register",
      timestamp: new Date().toLocaleString('vi-VN')
    });

    setIsLogin(newMode);
    setError("");
    setSuccess("");

    // Clear forms and log
    const previousLoginEmail = loginForm.email;
    const previousRegisterEmail = registerForm.email;

    setLoginForm({ email: "", password: "" });
    setRegisterForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      company: "",
    });

    console.log("🔍 DEBUG: Forms cleared after mode toggle", {
      previousLoginEmail,
      previousRegisterEmail,
      newMode: newMode ? "login" : "register",
      timestamp: new Date().toLocaleString('vi-VN')
    });
  };

  // Password visibility handlers with logging
  const togglePasswordVisibility = () => {
    const newVisibility = !showPassword;
    console.log("👤 USER ACTION: Toggle Password Visibility", {
      from: showPassword,
      to: newVisibility,
      field: "password",
      timestamp: new Date().toLocaleString('vi-VN')
    });
    setShowPassword(newVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    const newVisibility = !showConfirmPassword;
    console.log("👤 USER ACTION: Toggle Confirm Password Visibility", {
      from: showConfirmPassword,
      to: newVisibility,
      field: "confirmPassword",
      timestamp: new Date().toLocaleString('vi-VN')
    });
    setShowConfirmPassword(newVisibility);
  };

  // Error and success message logging
  useEffect(() => {
    if (error) {
      console.warn("⚠️ WARNING: Error message displayed", {
        error,
        mode: isLogin ? "login" : "register",
        timestamp: new Date().toLocaleString('vi-VN')
      });
    }
  }, [error, isLogin]);

  useEffect(() => {
    if (success) {
      console.log("ℹ️ INFO: Success message displayed", {
        success,
        mode: isLogin ? "login" : "register",
        timestamp: new Date().toLocaleString('vi-VN')
      });
    }
  }, [success, isLogin]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
              padding: 4,
              textAlign: "center",
            }}
          >
            <Business sx={{ fontSize: 48, marginBottom: 1 }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              CRM System
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, marginTop: 1 }}>
              {isLogin ? "Chào mừng trở lại!" : "Tạo tài khoản mới"}
            </Typography>
          </Box>

          <CardContent sx={{ padding: 4 }}>
            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ marginBottom: 2 }}>
                {success}
              </Alert>
            )}
            {isLogin ? (
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={loginForm.email}
                  onChange={handleLoginInputChange}
                  required
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Mật khẩu"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={handleLoginInputChange}
                  required
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    marginTop: 3,
                    marginBottom: 2,
                    padding: 1.5,
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #1976D2 30%, #1BA3D3 90%)",
                    },
                  }}
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="name"
                  value={registerForm.name}
                  onChange={handleRegisterInputChange}
                  required
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={registerForm.email}
                  onChange={handleRegisterInputChange}
                  required
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Công ty"
                  name="company"
                  value={registerForm.company}
                  onChange={handleRegisterInputChange}
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Mật khẩu"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={registerForm.password}
                  onChange={handleRegisterInputChange}
                  required
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterInputChange}
                  required
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    marginTop: 3,
                    marginBottom: 2,
                    padding: 1.5,
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #1976D2 30%, #1BA3D3 90%)",
                    },
                  }}
                >
                  {loading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
              </form>
            )}
            <Divider sx={{ marginY: 2 }} />
            <Box textAlign="center">
              <Typography variant="body2" color="textSecondary">
                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
              </Typography>
              <Button
                onClick={toggleMode}
                color="primary"
                sx={{ marginTop: 1 }}
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </Button>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
