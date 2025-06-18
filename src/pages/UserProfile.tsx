import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Person,
  Email,
  Business,
  Edit,
  Save,
  Cancel,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { authService } from '../services/authService';
import { User } from '../types';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    company: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setProfileForm({
        name: currentUser.name,
        email: currentUser.email,
        company: currentUser.company || '',
      });
      console.log('📄 PAGE VIEW: User Profile', {
        userId: currentUser.id,
        timestamp: new Date().toLocaleString('vi-VN')
      });
    }
  }, []);

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
    setError('');
    console.log('📝 FORM INPUT: profile-' + name, {
      valueLength: value.length,
      hasValue: !!value,
      timestamp: new Date().toLocaleString('vi-VN')
    });
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    setError('');
    console.log('FORM INPUT: password-' + name, {
      valueLength: value.length,
      hasValue: !!value,
      timestamp: new Date().toLocaleString('vi-VN')
    });
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
    console.log('👤 USER ACTION: Toggle Password Visibility', {
      field,
      timestamp: new Date().toLocaleString('vi-VN')
    });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    console.log('👤 USER ACTION: Edit Profile Started', {
      userId: user?.id,
      timestamp: new Date().toLocaleString('vi-VN')
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError('');
    // Reset form to original values
    if (user) {
      setProfileForm({
        name: user.name,
        email: user.email,
        company: user.company || '',
      });
    }
    console.log('👤 USER ACTION: Edit Profile Cancelled', {
      timestamp: new Date().toLocaleString('vi-VN')
    });
  };

  const handleSaveProfile = async () => {
    const startTime = performance.now();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!profileForm.name.trim()) {
        setError('Tên không được để trống');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profileForm.email)) {
        setError('Định dạng email không hợp lệ');
        setLoading(false);
        return;
      }

      console.log('INFO: Profile Update Started', {
        userId: user?.id,
        changes: profileForm,
        timestamp: new Date().toLocaleString('vi-VN')
      });

      // Update profile using authService
      const updatedUser = await authService.updateProfile(profileForm);

      const endTime = performance.now();
      const duration = endTime - startTime;

      setUser(updatedUser);
      setIsEditing(false);
      setSuccess('Cập nhật thông tin thành công!');

      console.log('PROFILE UPDATE SUCCESS', {
        userId: updatedUser.id,
        duration: `${duration.toFixed(2)}ms`,
        timestamp: new Date().toLocaleString('vi-VN')
      });

      setTimeout(() => setSuccess(''), 3000);

    } catch (err: any) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      console.error('ERROR [Profile Update]: Update failed', {
        error: err?.message || err,
        duration: `${duration.toFixed(2)}ms`,
        timestamp: new Date().toLocaleString('vi-VN')
      });

      setError(err.message || 'Cập nhật thông tin thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const startTime = performance.now();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!passwordForm.currentPassword || !passwordForm.newPassword) {
        setError('Vui lòng nhập đầy đủ thông tin');
        setLoading(false);
        return;
      }

      if (passwordForm.newPassword.length < 6) {
        setError('Mật khẩu mới phải có ít nhất 6 ký tự');
        setLoading(false);
        return;
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setError('Mật khẩu xác nhận không khớp');
        setLoading(false);
        return;
      }

      console.log('INFO: Password Change Started', {
        userId: user?.id,
        timestamp: new Date().toLocaleString('vi-VN')
      });
      
      await authService.changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );

      const endTime = performance.now();
      const duration = endTime - startTime;

      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setSuccess('Đổi mật khẩu thành công!');

      console.log('PASSWORD CHANGE SUCCESS', {
        userId: user?.id,
        duration: `${duration.toFixed(2)}ms`,
        timestamp: new Date().toLocaleString('vi-VN')
      });

      setTimeout(() => setSuccess(''), 3000);

    } catch (err: any) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      console.error('ERROR [Password Change]: Change failed', {
        error: err?.message || err,
        duration: `${duration.toFixed(2)}ms`,
        timestamp: new Date().toLocaleString('vi-VN')
      });

      setError(err.message || 'Đổi mật khẩu thất bại');
    } finally {
      setLoading(false);
    }
  };

  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>Đang tải thông tin người dùng...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Thông tin cá nhân
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Profile Information Card */}
        <Box sx={{ flex: 2 }}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  Thông tin cơ bản
                </Typography>
                {!isEditing && (
                  <IconButton onClick={handleEditProfile} color="primary">
                    <Edit />
                  </IconButton>
                )}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileInputChange}
                  disabled={!isEditing}
                  variant="outlined"
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
                  value={profileForm.email}
                  onChange={handleProfileInputChange}
                  disabled={!isEditing}
                  variant="outlined"
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
                  value={profileForm.company}
                  onChange={handleProfileInputChange}
                  disabled={!isEditing}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                {isEditing && (
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={handleCancelEdit}
                      startIcon={<Cancel />}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSaveProfile}
                      disabled={loading}
                      startIcon={<Save />}
                    >
                      {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </Button>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Avatar and Account Info Card */}
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: 'primary.main',
                    fontSize: '3rem',
                    mb: 2,
                  }}
                >
                  {getUserInitials(user.name)}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Vai trò: {user.role === 'admin' ? 'Quản trị viên' : user.role === 'sales' ? 'Nhân viên bán hàng' : 'Hỗ trợ'}
                </Typography>
                {user.company && (
                  <Typography variant="body2" color="textSecondary">
                    Công ty: {user.company}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Change Password Card */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Đổi mật khẩu
            </Typography>
            {!isChangingPassword && (
              <Button
                variant="outlined"
                onClick={() => setIsChangingPassword(true)}
                startIcon={<Lock />}
              >
                Đổi mật khẩu
              </Button>
            )}
          </Box>

          {isChangingPassword && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Mật khẩu hiện tại"
                name="currentPassword"
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordForm.currentPassword}
                onChange={handlePasswordInputChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility('current')}
                        edge="end"
                      >
                        {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Mật khẩu mới"
                name="newPassword"
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordForm.newPassword}
                onChange={handlePasswordInputChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility('new')}
                        edge="end"
                      >
                        {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordForm.confirmPassword}
                onChange={handlePasswordInputChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility('confirm')}
                        edge="end"
                      >
                        {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordForm({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    });
                    setError('');
                  }}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  onClick={handleChangePassword}
                  disabled={loading}
                  startIcon={<Save />}
                >
                  {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
