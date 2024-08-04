import { useState, useCallback, useEffect } from 'react';

type PanelType = 'menu' | 'settings' | 'exit';

export const usePanel = () => {
    const [activePanel, setActivePanel] = useState<PanelType | null>(null);
    const [closingPanel, setClosingPanel] = useState<PanelType | null>(null);

    const togglePanel = useCallback((panel: PanelType) => {
        if (activePanel === panel) {
            setClosingPanel(panel);
        } else {
            setActivePanel(panel);
        }
    }, [activePanel]);

    const closePanel = useCallback(() => {
        setClosingPanel(activePanel);
    }, [activePanel]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && activePanel) {
                closePanel();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [activePanel, closePanel]);

    useEffect(() => {
        if (closingPanel) {
            const timer = setTimeout(() => {
                setActivePanel(null);
                setClosingPanel(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [closingPanel]);

    return { activePanel, closingPanel, togglePanel, closePanel };
};
