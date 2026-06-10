import { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import './index.css'

function App() {

  // Extract message list from a session object
  function getSessionMessages(session) {
    if (!session) return [];
    if (Array.isArray(session)) return session;
    return session.messages || [];
  }

  // Extract sidebar title from a session object
  function getSessionTitle(session) {
    if (!session || Array.isArray(session)) return "新对话";
    return session.title || "新对话";
  }

  // User input in the message box
  const [input, setInput] = useState("");

  // Reset to blank state for a new chat
  const createNewChat = () => {
    setCurrentSessionId("");
  }

  // Remove a session from the sidebar and storage
  const deleteSession = (id) => {
    const updatedSessions = { ...sessions };
    delete updatedSessions[id];
    setSessions(updatedSessions);

    if (id === currentSessionId) {
      setCurrentSessionId("");
    }
  }

  // ID of the chat currently open in the main panel
  const [currentSessionId, setCurrentSessionId] = useState("");

  // All chat sessions, loaded from localStorage on first render
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem("sessions");
    if (savedSessions) {
      return JSON.parse(savedSessions);
    }
    return {};
  });

  // Messages shown in the main chat area
  const messages = getSessionMessages(sessions[currentSessionId]);

  // Persist sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  // Send user message, stream AI reply, and update session state
  const sendMessage = async () => {
    if (!input.trim()) return;

    let sessionId = currentSessionId;

    // Create a new session if none is selected yet
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      setSessions(prev => ({
        ...prev,
        [sessionId]: {
          title: "新对话",
          messages: []
        }
      }));
      setCurrentSessionId(sessionId);
    }

    // Build the new user message and append a placeholder for AI
    const newMessage = { role: "user", content: input };
    const newMessages = [...messages, newMessage];
    setInput("");

    const aiMessage = { role: "assistant", content: "" };
    const tempMessages = [...newMessages, aiMessage];

    // Save messages immediately so the UI updates before streaming
    setSessions(prev => ({
      ...prev,
      [sessionId]: {
        title: getSessionTitle(prev[sessionId]),
        messages: tempMessages
      }
    }));

    // On first message, ask the backend to generate a short topic title
    const isFirstMessage = newMessages.length === 1;
    if (isFirstMessage) {
      fetch("http://localhost:3001/title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.content }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSessions((prev) => {
            if (!prev[sessionId]) return prev;
            return {
              ...prev,
              [sessionId]: {
                title: data.title,
                messages: getSessionMessages(prev[sessionId]),
              },
            };
          });
        });
    }

    // Stream the AI reply from the backend
    const res = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: tempMessages }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let result = "";

    // Read stream chunks and update the assistant message in real time
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      result += chunk;

      setSessions(prev => {
        if (!prev[sessionId]) return prev;

        const oldSession = prev[sessionId];
        const updated = [...getSessionMessages(oldSession)];
        updated[updated.length - 1] = { role: "assistant", content: result };

        return {
          ...prev,
          [sessionId]: {
            title: getSessionTitle(oldSession),
            messages: updated
          }
        };
      });
    }
  };

  return (
    <div className='app'>

      {/* Sidebar: new chat button and session list */}
      <aside className="sidebar">
        <button onClick={createNewChat} className="newChat">
          New chat
        </button>
        {
          Object.keys(sessions).map(id => (
            <div key={id} className="session-item">
              <button
                className={`session-select ${id === currentSessionId ? 'active' : ''}`}
                onClick={() => setCurrentSessionId(id)}
              >
                {getSessionTitle(sessions[id])}
              </button>
              <button
                onClick={() => deleteSession(id)}
                className="delete"
              >
                Delete
              </button>
            </div>
          ))
        }
      </aside>

      {/* Main panel: header, messages, and input */}
      <div className="chat-container">
        <header className="chat-header">
          CHAT UI
        </header>

        <main className="chat-area">
          {messages.map((msg, index) => (
            <div key={index} className={`message-row ${msg.role}`}>
              <div className="bubble">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </main>

        <footer className="input-area">
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { sendMessage(); } }}
            placeholder='type your message...'
          />
          <button onClick={sendMessage}>Send</button>
        </footer>
      </div>
    </div>
  );
}

export default App;
