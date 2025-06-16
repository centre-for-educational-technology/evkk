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
import '../../styles/ShareLinkModal.css';

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
          setShortUrl(Array.isArray(data) && data.length > 0 ? data[0] : 'Viga linki luues');
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
      <DialogTitle className="dialog-title">Jagatav link</DialogTitle>
      <DialogContent className="dialog-content">
        {loading ? (
          <Box className="dialog-loading">
            <CircularProgress size={20} />
            <Typography>Genereerin lühilinki...</Typography>
          </Box>
        ) : (
          <Typography className="dialog-link-box">
            {shortUrl}
          </Typography>
        )}
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose}>Sulge</Button>
        <Button onClick={handleCopy} disabled={!shortUrl || loading}>
          {copied ? 'Kopeeritud!' : 'Kopeeri'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
