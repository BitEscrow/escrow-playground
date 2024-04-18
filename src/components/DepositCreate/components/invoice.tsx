import { useState, useEffect } from 'react';
import { TextInput, Divider, Group, CopyButton, Button, Paper, Loader } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';

export default function Invoice() {
    const [inputValue, setInputValue] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowLoader(true);
            setTimeout(() => setShowLoader(false), 1000); // Show loader for 1 second
        }, 3000); // Every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ marginTop: '30px' }}>
            <Paper style={{ position: 'relative', display: 'inline-block'}}>
                <img src="https://via.placeholder.com/500" alt="Placeholder" style={{ maxWidth: '250px', maxHeight: '250px' }} />
                {showLoader && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    }}>
                        <Loader /> {/* Checking NULL */}
                    </div>
                )}
            </Paper>
            <Group justify="center" style={{ marginTop: '20px', maxWidth: '500px' }}>
                <TextInput
                    label="Filler Title"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ flex: 1 }}
                />
                <CopyButton value={inputValue}>
                    {({ copied, copy }) => (
                        <Button onClick={copy} color={copied ? '#3F8C4F' : '#0068FD'} style={{
                            transform: 'translateY(12px)',
                            borderRadius: '15px'
                        }}>
                            {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                        </Button>
                    )}
                </CopyButton>
            </Group>

            <Divider mb={40} mt={70} />
        </div>
    );
}
