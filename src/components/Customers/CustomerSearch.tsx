import React, { useState } from 'react';
import {
    TextField,
    InputAdornment,
    Box,
    Typography,
    Chip,
    CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

interface CustomerSearchProps {
    onSearch: (query: string) => void;
    searchQuery: string;
    resultCount?: number;
    loading?: boolean;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({
    onSearch,
    searchQuery,
    resultCount,
    loading = false,
}) => {
    const [inputValue, setInputValue] = useState(searchQuery);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        onSearch(value);
    };

    const handleClear = () => {
        setInputValue('');
        onSearch('');
    };

    return (
        <Box sx={{ mb: 3 }}>
            <TextField
                fullWidth
                placeholder="Search customers by name, email, or company..."
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
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                    },
                }}
            />
            {searchQuery && (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Search results for "{searchQuery}":
                    </Typography>
                    <Chip
                        label={loading ? 'Searching...' : (resultCount !== undefined ? `${resultCount} customer${resultCount !== 1 ? 's' : ''}` : '...')}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                </Box>
            )}
        </Box>
    );
};

export default CustomerSearch; 