import { Box, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Send } from '@mui/icons-material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useState } from "react";

const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [isPromptProcessing, setIsPromptProcessing] = useState(false);
  // const [promptResponseMap, setPromptResponseMap] = useState(new Map());
  // const promptResponseMap = new Map();
  const [promptResponseMap, setPromptResponseMap] = useState(new Map()); 

  
  const handleSendPrompt = () => {
    handlePrompt();
  };

  const onPromptChangeHandle = (event) => {
    let code = (event.keyCode ? event.keyCode : event.which);
    if(code === 13 && event.shiftKey) {
      return;
    }
    if(code == 13) {
      event.preventDefault();
      handlePrompt();
    }
  }

  const handlePrompt = async () => {
    setIsPromptProcessing(true);
    fetch(`${import.meta.env.REACT_APP_API_URL}/llama/ai?prompt=${prompt}`, {
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream'
      }
    })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
    
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      while(true) {
        const { value, done } = await reader.read();
        if(done) {
          setIsPromptProcessing(false);
          let tempMap = new Map();
          tempMap.set(prompt, promptResponse);
          setPromptResponseMap(tempMap => new Map(tempMap.set(prompt, promptResponse))); 
          
          break;
        }
        const decodedChunk = decoder.decode(value);
        const parsedLines = decodedChunk.replace("\n", "").replace("\n", " ").replace("data:", "");
        
        setPromptResponse((prev) => prev.replace('data:', '') + parsedLines);
      }

      return new ReadableStream({
        pull: async (controller) => {
          const { value, done } = await reader.read();
          if (done) {
            controller.close();
          } else {
            controller.enqueue(value);
          }
        }
      });
    })
  };

  return (
    <Box sx={{ flexGrow: 5 }}>
      <Box sx={{ m: 3 }}>
        <FormControl fullWidth sx={{ maxWidth: '100%' }} variant="standard">
          <InputLabel htmlFor="user-prompt">Prompt To SherwinGPT</InputLabel>
          <Input
            fullWidth
            id="user-prompt"
            type="text"
            multiline
            disabled={isPromptProcessing}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={onPromptChangeHandle}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Input prompt text"
                  onClick={handleSendPrompt}
                  disabled={isPromptProcessing}
                >
                  {isPromptProcessing ? <AutorenewIcon sx={{
                      animation: "spin 2s linear infinite",
                      "@keyframes spin": {
                        "0%": {
                          transform: "rotate(360deg)",
                        },
                        "100%": {
                          transform: "rotate(0deg)",
                        },
                      },
                    }}/> : <Send />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box sx={{ m: 4 }}>
        <div style={{ whiteSpace: 'pre-wrap' }}>{promptResponse}</div>
        <Divider />
        <div style={{ whiteSpace: 'pre-wrap' }}>{promptResponseMap && promptResponseMap.forEach(key => {
          return <div>
                <strong>{key}</strong>
                <p>{promptResponseMap[key]}</p>
              </div>
        })}</div>

      </Box>
    </Box>
  );
};

export default Chat;