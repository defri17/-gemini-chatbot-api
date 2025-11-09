const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
// Tentukan endpoint API Anda
const apiEndpoint = '/api/chat';

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  const thinkingMessage = appendMessage('bot', 'Thinking...');

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', text: userMessage }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to get response. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.result) {
      thinkingMessage.textContent = data.result;
    } else {
      thinkingMessage.textContent = 'Sorry, no response received.';
    }

  } catch (error) {
    console.error('Error fetching chat response:', error);
    thinkingMessage.textContent = 'Failed to get response from server.';
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('chat-message', `${sender}-message`); 
  
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  return msg;
}