import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box
} from '@mui/material';

export default function ShareLinkModal({ open, onClose, originalUrl }) {
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open && originalUrl) {
      setLoading(true);
      setShortUrl('');
      setCopied(false);

      const url = process.env.NODE_ENV === 'production'
        ? '/api/short-url/generate'
        : 'http://localhost:9090/api/short-url/generate';

      const formData = new FormData();
      formData.append('originalUrl', originalUrl);

      fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          setShortUrl(data.shortUrl);
        })
        .catch(() => {
          setShortUrl('Viga linki luues');
        })
        .finally(() => setLoading(false));
    }
  }, [open, originalUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Jagatav link</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={20} />
            <Typography>Genereerin lühilinki...</Typography>
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{
              wordBreak: 'break-all',
              background: '#f5f5f5',
              padding: '8px 12px',
              borderRadius: 2,
              marginTop: 1
            }}
          >
            {shortUrl}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Sulge</Button>
        <Button onClick={handleCopy} disabled={!shortUrl || loading}>
          {copied ? 'Kopeeritud!' : 'Kopeeri'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
