import React, { useState } from 'react';
import {
    TextField,
    InputAdornment,
    Box,
    Typography,
    Chip,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

interface CustomerSearchProps {
    onSearch: (query: string, status: string) => void;
    searchQuery: string;
    searchStatus: string;
    resultCount?: number;
    loading?: boolean;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({
    onSearch,
    searchQuery,
    searchStatus,
    resultCount,
    loading = false,
}) => {
    const [inputValue, setInputValue] = useState(searchQuery);
    const [statusValue, setStatusValue] = useState(searchStatus);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        onSearch(value, statusValue);
    };

    const handleStatusChange = (event: any) => {
        const value = event.target.value;
        setStatusValue(value);
        onSearch(inputValue, value);
    };

    const handleClear = () => {
        setInputValue('');
        setStatusValue('all');
        onSearch('', 'all');
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                    label="enter name of customer"
                    value={inputValue}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {loading && <CircularProgress size={20} />}
                                {inputValue && !loading && (
                                    <ClearIcon
                                        onClick={handleClear}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                )}
                            </InputAdornment>
                        ),
                    }}
                    size="small"
                    sx={{ minWidth: 250 }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusValue}
                        label="Status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="lead">Lead</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{ ml: 'auto' }}>
                    <Chip
                        label={`${resultCount || 0} kết quả`}
                        color="primary"
                        variant="outlined"
                    />
                </Box>
            </Box>
            {(searchQuery || searchStatus !== 'all') && (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Kết quả tìm kiếm:
                        {searchQuery && ` tên "${searchQuery}"`}
                        {searchQuery && searchStatus !== 'all' && ' và'}
                        {searchStatus !== 'all' && ` trạng thái "${searchStatus}"`}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default CustomerSearch;
