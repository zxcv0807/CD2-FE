// ai 답변 복사를 위한 커스텀 훅

import { useState } from 'react';

export const useCopyToClipboard = () => {
    const [copiedStates, setCopiedStates] = useState({});

    const copyToClipboard = async (text, id = 'default') => {
        try {
        await navigator.clipboard.writeText(text);
        setCopiedStates(prev => ({ ...prev, [id]: true }));
        // 2초 후 복사 상태 초기화
        setTimeout(() => {
            setCopiedStates(prev => ({ ...prev, [id]: false }));
        }, 2000);
        return true;
        } catch (err) {
        console.error('복사 실패:', err);
        // 만약 clipboard API가 안되면 fallback
        return fallbackCopyTextToClipboard(text, id);
        }
    };

    // clipboard API 지원하지 않는 브라우저용 fallback
    const fallbackCopyTextToClipboard = (text, id = 'default') => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
        const successful = document.execCommand('copy');
        if (successful) {
            setCopiedStates(prev => ({ ...prev, [id]: true }));
            setTimeout(() => {
            setCopiedStates(prev => ({ ...prev, [id]: false }));
            }, 2000);
        }
        document.body.removeChild(textArea);
        return successful;
        } catch (err) {
        console.error('Fallback 복사 실패:', err);
        document.body.removeChild(textArea);
        return false;
        }
    };

    const isCopied = (id = 'default') => {
        return copiedStates[id] || false;
    };

    return { copyToClipboard, isCopied };
};