import { useState } from 'react';
import copy from 'clipboard-copy';
import { Clipboard, ClipboardCheck } from 'lucide-react';

const CopyToClipboardButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    if (!text) return;

    try {
      await copy(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to copy text to clipboard', error);
    }
  };

  return (
    <div>
      <button onClick={handleCopyClick}>
        {isCopied ? (
          <ClipboardCheck className="text-purple-600 animate animate-bounce" />
        ) : (
          <Clipboard />
        )}
      </button>
    </div>
  );
};

export default CopyToClipboardButton;