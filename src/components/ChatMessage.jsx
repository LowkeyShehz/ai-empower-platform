
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Format the timestamp
  const formattedTime = message.timestamp ? 
    formatDistanceToNow(new Date(message.timestamp), { addSuffix: true }) : '';
  
  return (
    <div className={`mb-4 ${isUser ? 'ml-auto' : 'mr-auto'}`}>
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end ml-auto' : 'items-start'}`}>
        <div className={`px-4 py-2 rounded-lg ${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground'
        }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {isUser ? 'You' : 'AI'} • {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
